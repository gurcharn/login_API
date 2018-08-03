const express = require('express');
const router = express.Router();
const db = require('./Database');

router.delete('/user/:staffId', (req, res, next) => {
        if (req.params.email) {
            sqlQuery = "DELETE FROM login WHERE staffId = " + req.params.staffId
            db.query(sqlQuery, function (err, result) {
                if (err) {
                    console.log(err);
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


router.delete('/company/:companyId', (req, res, next) => {
        if (req.params.companyId) {
            sqlQuery = "DELETE FROM login WHERE companyId = " + req.params.companyId
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

module.exports = router;