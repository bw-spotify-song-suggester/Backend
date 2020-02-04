const express = require('express');
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router');
const server = express();
var cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const restricted = require('../auth/restricted-middleware.js');

const sessionConfig = {
    name: 'Cookie',
    secret: 'Big Secret',
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
};

server.use(
    cors({
        credentials: true,
        origin: true
    })
);

server.options('*', cors());

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))
server.use('/api/auth', authRouter);
server.use('/api/user', restricted, userRouter);

module.exports = server;