const express = require('express');
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const restricted = require('../auth/restricted-middleware.js');

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/user', restricted, userRouter);

module.exports = server;