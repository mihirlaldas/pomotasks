# Task time traker built using

- [x] mysql
- [x] flask
- [x] react,redux,router

# [App demo video](https://drive.google.com/open?id=1hbilVsJzxC8aFMJxJyVZYHFbXWVhK6Jv)

## How to install and run the App

- First import pomotasks.sql . you will get all the tables with some data
  - Tables are users, projects, tasks
  - sample user credentials
    - email : mihir@gmail.com, password : mihirlaldas
    - email : somu@in.com, password : somu
- allow CORS . ** gives error if not allowed **

  - [install chrome extension cors](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

- start flask app.

  - in your terminal goto /backend
  - run the following commands
    - export FLASK_ENV=development
    - export FLASK_APP=server.py
    - flask run

- start frontend
  - in your terminal go to /frontend
    - npm i
    - npm start

## DB schema

```
    mysql> describe users;

+----------+--------------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+----------------+
| id | int(11) | NO | PRI | NULL | auto_increment |
| name | varchar(255) | NO | | NULL | |
| email | varchar(255) | NO | UNI | NULL | |
| password | varchar(255) | NO | | NULL | |
| salt | varchar(255) | NO | | NULL | |
+----------+--------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)

mysql> describe projects
-> ;
+--------------+--------------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+----------------+
| id | int(11) | NO | PRI | NULL | auto_increment |
| project_name | varchar(255) | NO | | NULL | |
| user_id | int(11) | NO | MUL | NULL | |
+--------------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> describe tasks
-> ;
+--------------+--------------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra |
+--------------+--------------+------+-----+---------+----------------+
| id | int(11) | NO | PRI | NULL | auto_increment |
| project_id | int(11) | NO | MUL | NULL | |
| user_id | int(11) | NO | MUL | NULL | |
| task_name | varchar(255) | NO | | NULL | |
| start_time | time | NO | | NULL | |
| end_time | time | NO | | NULL | |
| total_time | time | NO | | NULL | |
| elapsed_time | time | NO | | NULL | |
+--------------+--------------+------+-----+---------+----------------+
8 rows in set (0.00 sec)

```
