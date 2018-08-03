const express = require('express');
const router = express.Router();
const db = require('./Database');


router.patch('/email/:staffId', (req, res, next) => {
        if (req.params.staffId && req.body.newEmail) {
            sqlQuery = "UPDATE login SET email = \""+ req.body.newEmail +"\" WHERE staffId = " + req.params.staffId
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
                    res.status(200).json({
                        message: "Response Retrieved",
                        error: null,
                        response: result
                    });
                }
              });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: "Provide staffId & newEmail",
                response: null
            });
        }
});


router.patch('/activeStaff/:staffId', (req, res, next) => {
        if (req.params.staffId && req.body.newActive) {
            sqlQuery = "UPDATE login SET active = \""+ req.body.newActive +"\" WHERE staffId = " + req.params.staffId
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
                    res.status(200).json({
                        message: "Response Retrieved",
                        error: null,
                        response: result
                    });
                }
              });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: "Provide staffId",
                response: null
            });
        }
});


router.patch('/activeCompany/:companyId', (req, res, next) => {
        if (req.params.companyId && req.body.newActive) {
            sqlQuery = "UPDATE login SET active = \""+ req.body.newActive +"\" WHERE companyId = " + req.params.companyId
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
                    res.status(200).json({
                        message: "Response Retrieved",
                        error: null,
                        response: result
                    });
                }
              });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: "Provide Company ID",
                response: null
            });
        }
});


router.patch('/password/:staffId', (req, res, next) => {
        if (req.params.staffId && req.body.newPassword) {
            bcrypt.hash(req.body.newPassword, 10, (err,hash) => {
                if (err) {
                    console.log(err+"");
                    res.status(500).json({
                        message: "Entry not created",
                        errors: err,
                        response: null
                    });
                }
                else {
                    sqlQuery = "UPDATE login SET password = "+ hash +" WHERE staffId = " + req.params.staffId
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
                                response:  result
                            });
                        }
                    });
                }
            });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: "Provide staffId & new password",
                response: null
            });
        }
});



module.exports = router;