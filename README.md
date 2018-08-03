=>
    login (This API works to handle different requests realted to login credentials and generate json web token)

=>
    How to run it on local environment?
    
    1. open terminal / command line in root directory.
    2. run command "npm install" to download all dependencies.
    3. step 1 & 2 should be followed everytime you pull changes or clone repos from git.
    4. run command "npm start" to run server
    5. server will start running on localhost:3000/login/

=>
    What does it do?
    
    1. Create / Remove log in credetials in database.
    2. To make an account active / non-active.
    3. Search log in related information of different users.
    4. Hashing password.
    5. Creating jwt(json web token) while logging in if email and password matches.

=>
    Database Schema ->

    CREATE DATABASE login_API;
    CREATE TABLE login(
        companyId VARCHAR(100) NOT NULL,
        staffId VARCHAR(100) NOT NULL,
        userType VARCHAR(100) NOT NULL,
        active TINYINT(1) DEFAULT 0 NOT NULL,
        email VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
        password VARCHAR(1000) NOT NULL);