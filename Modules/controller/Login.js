const express = require('express');
const db = require('./Database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const search = require('./Search');
const update = require('./Update');
const remove = require('./Delete');

router.use('/search',search);
router.use('/update',update);
router.use('/delete',remove);

router.post('/signIn', (req, res, next) => {
        if (req.body.email.length>0 && req.body.password.length>0) {
            sqlQuery = "SELECT * FROM login WHERE email = \"" + req.body.email +"\"";

            db.query(sqlQuery, function (err, result) {
                if (err) {
                    console.log(err+"");
                    res.status(500).json({
                        message: "No Response",
                        errors: err,
                        response: null
                    });
                }
                else {
                    if (result[0] == undefined) {
                        res.status(404).json({
                            message: "No Response",
                            errors: "Email / Password not valid",
                            response: null
                        });
                    }
                    else {
                        if (req.body.email == result[0].email && result[0].active != 0) {
                            bcrypt.compare(req.body.password, result[0].password, (error,response) => {
                                if (response) {
                                    const token = jwt.sign(
                                        {
                                            staffId: result[0].staffId,
                                            companyId: result[0].companyId
                                        },
                                        "login_private_token",
                                        {
                                            expiresIn: "10h"
                                        }       
                                    );
                                    res.status(200).json({
                                        message: "Response Retrieved",
                                        error: null,
                                        response: {
                                            token: token
                                        }
                                    });
                                }
                                else {
                                    res.status(404).json({
                                        message: "No Response",
                                        errors: "Invalid Email / Password",
                                        response: null
                                    });
                                }
                            });
                        }
                        else {
                            res.status(404).json({
                                message: "Invalid Credentials",
                                errors: "Email / Password not valid or Account not active",
                                response: null
                            });
                        }
                    }
                }
            });
        }
        else {
            res.status(404).json({
                message: 'Information Missing',
                errors: "Provide email & password to login",
                response: null
            });
        }
});

router.post('/createLogin', (req, res, next) => {
    var errorList = validateRequestBody(req.body);

        if (errorList.length == 0) {
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if (err) {
                    console.log(err+"");
                    res.status(500).json({
                        message: "Entry not created",
                        errors: err,
                        response: null
                    });
                }
                else {
                    sqlQuery = 'INSERT INTO login (companyId, staffId, userType, active, email, password)' +
                                'VALUES (\"' + req.body.companyId + '\",\"' + req.body.staffId + '\",\"' +
                                req.body.userType + '\",\"'+ 0 + '\",\"' +
                                req.body.email + '\",\"' + hash +'\")'
                    db.query(sqlQuery, function (err, result) {
                        if (err) {
                            console.log(err+"");
                            res.status(500).json({
                                message: "Entry not created",
                                errors: err,
                                response: null
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "Entry Created",
                                error: null,
                                response: result
                            });
                        }
                    });
                }
            });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: errorList,
                response: null
            });
        }
});

function validateRequestBody(requestBody) {
    var errors = [];
        
    if (!requestBody.companyId) { errorList.push("Company ID missing"); }
    if (!requestBody.staffId) { errorList.push("Staff ID missing"); }
    if (!requestBody.userType) { errorList.push("User Type missing"); }
    if (!requestBody.email) { errorList.push("Email missing"); }
    if (!requestBody.password) { errorList.push("Password missing"); }

    return errors;
}

module.exports = router;