const express = require('express')
const configureMiddleware = require('./configure-middleware.js')
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');
const server = express();

configureMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


module.exports = server;
