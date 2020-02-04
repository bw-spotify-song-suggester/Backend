const express = require('express');
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router');
const server = express();
var cors = require('cors');

server.use(
    cors({
        credentials: true,
        origin: true
    })
);

server.options('*', cors());

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);

module.exports = server;