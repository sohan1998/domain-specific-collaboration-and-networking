let express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { frontendIP, frontendPort, sessionSecretKey } = require('./config/serverConfig');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(cors({ origin: 'http://${frontendIP}:${frontendPort}', credentials: true }));

app.use(cookieParser());

app.use(
    session({
        secret: sessionSecretKey,
        resave: false,
        saveUninitialized: false,
        duration: 60 * 60 * 1000,
        activeduration: 5 * 60 * 1000,
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

module.exports = app;
