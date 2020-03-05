const express = require('express')
const configureMiddleware = require('./configure-middleware.js')
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');
const adminRouter = require('../admins/admin-router');
const workerRouter = require('../workers/worker-router');
const tripRouter = require('../trips/trip-router.js');
const airportRouter = require('../airports/airport-router.js');
const server = express();

configureMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/trips', tripRouter)
server.use('/api/admins', adminRouter);
server.use('/api/workers', workerRouter);
server.use('/api/airports', airportRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: "Welcome to the Kidsfly server!"})
})
module.exports = server;
