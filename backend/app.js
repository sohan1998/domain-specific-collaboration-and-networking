import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { frontendIP, frontendPort, sessionSecretKey } from './config/serverConfig.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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

export default app;
