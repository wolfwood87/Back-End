const express = require('express')
const configureMiddleware = require('./configure-middleware.js')
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');
const adminRouter = require('../admins/admin-router');
const workerRouter = require('../workers/worker-router');
const tripRouter = require('../trips/trip-router.js');
const server = express();

configureMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/trips', tripRouter)
server.use('/api/admins', adminRouter);
server.use('/api/workers', workerRouter);

module.exports = server;
