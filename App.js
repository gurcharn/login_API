const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const login = require('./Modules/controller/Login');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Reequested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/login',login);

app.use((req, res, next) => {
    const error = new error('endpoint not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: "Endpoint not found",
        error: "Invalid Request",
        response: null
    });
});

module.exports = app;