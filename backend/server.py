from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
import hashlib
import os
import json
import jwt
import datetime
app=Flask(__name__)

# db connnection configuration
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'pomo'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route("/")
def home():
    return("home page")

# salt will be combined with password to encrypt
def generate_salt():
    salt = os.urandom(16)
    print(salt.encode('base-64'))
    return salt.encode('base-64')

# encryption
def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    print(hash.hexdigest())
    return hash.hexdigest()

@app.route("/signup",methods=['POST'])
def create():
    name = str(request.json["name"])
    email= str(request.json["email"])
    password=request.json["password"]
    
    cursor = mysql.connection.cursor()
    
    salt=generate_salt()
    hash_password=md5_hash(salt+" "+password)
    # generate complex password by encrypting 50 times
    for _ in range(50):
        hash_password=md5_hash(hash_password)
    
    try:
        cursor.execute (
        """INSERT INTO users (name,salt,password,email) VALUES (%s,%s,%s,%s)""", (name,salt,hash_password,email)
    )
        mysql.connection.commit()
    except Exception as e:
        return jsonify({"error": True,  "message": str(e)})
    finally:
        cursor.close()
    return json.dumps({"error": False,  "message": "Registration successful"})




@app.route("/login",methods=['POST'])
def login():
    email=str(request.json["email"])
    password=str(request.json["password"])
    cursor = mysql.connection.cursor()
    print(type(email))
    try:
        cursor.execute (
            """SELECT email FROM users WHERE email=%s""", (email,)
        )        
        result=cursor.fetchone()
        if(result==None):
            return jsonify({"error":True,"message": "Invalid user email!! Please register:)"})

    except Exception as e:
        print(e)
        return jsonify({"error":True,"message": str(e)})
    
    try:
        cursor.execute("""SELECT salt FROM users WHERE email=%s""",(email,))
        salt=cursor.fetchone()
        print(salt)
        hash_password=md5_hash(salt["salt"]+" "+password)
        for _ in range(50):
            hash_password = md5_hash(hash_password)
        cursor.execute("""SELECT password FROM users WHERE email=%s""",(email,))
        password=cursor.fetchone()
        # cursor.close()
        print(password)
        if(hash_password != password["password"]):
            return jsonify({"error":True,"message": "incorrect password"})
        else:
            key="secret"
            encoded = jwt.encode({'email':email},key,algorithm='HS256')
            cursor.execute("""SELECT id,name from users WHERE email=%s""",(email,))
            user=cursor.fetchone()
            return json.dumps({"error":False,"token":encoded,"user_id":user["id"],"name":user["name"],"email":email})
    except Exception as e:
        cursor.close()
        print(e)
        return jsonify({"error":True,"message": str(e)})


# jwt authentication with secret key
def jwt_auth(token):
    try:
        email = jwt.decode(token, 'secret', algorithms=['HS256'])
        cursor=mysql.connection.cursor()
        cursor.execute("""SELECT count(id) FROM users WHERE email=%s""",(str(email["email"]),))
        result = cursor.fetchone()
        print(result)
    except:
        return jsonify({"error":True,"message": "unauthorised access restricted"})
    
    if(result["count(id)"]==0):
        return False
    else:
        return True

# user infomation
@app.route("/user",methods=['GET'])
def auth():
    auth_header = request.headers.get('Authorization')
    if(auth_header is not None):
        token = auth_header.split(' ')[1]
    #    if user has valid jwt send user details
        if jwt_auth(token):
            try:
                cursor=mysql.connection.cursor()
                email = jwt.decode(token, 'secret', algorithms=['HS256'])
                print(email)
                cursor.execute("""SELECT id,name,email FROM users WHERE email=%s""",(str(email["email"]),))
                result = cursor.fetchone()
                return jsonify({"error":False,"data": result})
            except:
                return jsonify({"error":True,"message": "unauthorised access restricted"})
            finally:
                cursor.close()
        else:
            return jsonify({"error":True,"message": "unauthorised access restricted"})
    else:
        return jsonify({"error":True,"message": "unauthorised access restricted"})

# get all projects of a user

@app.route("/projects",methods=['POST'])
def projects():
    auth_header = request.headers.get('Authorization')
    user_id=str(request.json["user_id"])
    if(auth_header is not None):
        token = auth_header.split(' ')[1]
    #    if user has valid jwt send user details
        if jwt_auth(token):
            try:
                cursor=mysql.connection.cursor()
                cursor.execute("""SELECT * from projects WHERE user_id=%s;""",(user_id,))
                result = cursor.fetchall()
                # print(result)
                res ={"error":False,"data": result}
                return json.dumps(res, indent=4, sort_keys=True, default=str)
            except Exception as e:
                return jsonify({"error":True,"message": str(e)})
            finally:
                cursor.close()
        else:
            return jsonify({"error":True,"message": "unauthorised access restricted"})
    else:
        return jsonify({"error":True,"message": "unauthorised access restricted"})

# get all tasks of a project

@app.route("/tasks",methods=['POST'])
def tasks():
    auth_header = request.headers.get('Authorization')
    project_id=str(request.json["project_id"])
    if(auth_header is not None):
        token = auth_header.split(' ')[1]
    #    if user has valid jwt send user details
        if jwt_auth(token):
            try:
                cursor=mysql.connection.cursor()
                cursor.execute("""SELECT * from tasks WHERE project_id=%s;""",(project_id,))
                result = cursor.fetchall()
                # print(result)
                res ={"error":False,"data": result}
                return json.dumps(res, indent=4, sort_keys=True, default=str)
            except Exception as e:
                return jsonify({"error":True,"message": str(e)})
            finally:
                cursor.close()
        else:
            return jsonify({"error":True,"message": "unauthorised access restricted"})
    else:
        return jsonify({"error":True,"message": "unauthorised access restricted"})


# create a project

@app.route("/create_project",methods=['POST'])
def create_project():
    auth_header = request.headers.get('Authorization')
    user_id=str(request.json["user_id"])
    project_name = str(request.json["project_name"])
    if(auth_header is not None):
        token = auth_header.split(' ')[1]
    #    if user has valid jwt send user details
        if jwt_auth(token):
            try:
                cursor=mysql.connection.cursor()
                cursor.execute("""INSERT INTO projects (project_name,user_id) VALUES(%s,%s);""",(project_name,user_id,))
                mysql.connection.commit()
                return json.dumps({"error":False,"message":"new Project inserted successfully"})
            except Exception as e:
                return jsonify({"error":True,"message": str(e)})
            finally:
                cursor.close()
        else:
            return jsonify({"error":True,"message": "unauthorised access restricted"})
    else:
        return jsonify({"error":True,"message": "unauthorised access restricted"})


# create new Task
@app.route("/create_task",methods=['POST'])
def create_task():
    auth_header = request.headers.get('Authorization')
    user_id=str(request.json["user_id"])
    task_name = str(request.json["task_name"])

    date_format =  '%H:%M' 
    start_time = str(request.json["start_time"])
    start_time = datetime.datetime.strptime(start_time,date_format)
    end_time = str(request.json["end_time"])
    end_time = datetime.datetime.strptime(end_time,date_format)
    project_id= str(request.json["project_id"])
    total_time = end_time-start_time
    total_time = (datetime.datetime.min + total_time).time()

    start_time=start_time.time()
    end_time=end_time.time()
    elapsed_time="00:00:00"
    print(task_name,start_time,end_time,total_time)
    if(auth_header is not None):
        token = auth_header.split(' ')[1]
    #    if user has valid jwt send user details
        if jwt_auth(token):
            try:
                cursor=mysql.connection.cursor()
                cursor.execute("""INSERT INTO tasks (project_id,user_id,task_name,start_time,end_time,total_time,elapsed_time) VALUES(%s,%s,%s,%s,%s,%s,%s);""",(project_id,user_id,task_name,start_time,end_time,total_time,elapsed_time))
                mysql.connection.commit()
                return json.dumps({"error":False,"message":"new task inserted successfully"})
            except Exception as e:
                return jsonify({"error":True,"message": str(e)})
            finally:
                cursor.close()
        else:
            return jsonify({"error":True,"message": "unauthorised access restricted: incorrect token"})
    else:
        return jsonify({"error":True,"message": "unauthorised access restricted: no header found"})