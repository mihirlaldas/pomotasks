from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
import hashlib
import os
import json
import jwt

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

