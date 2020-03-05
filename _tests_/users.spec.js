const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('user endpoint', () => {
    it('should fail in showing user', async () => {
        const data = {username: 'User', password: 'password'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        var token;
        const login = await request(server).post('/api/auth/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        token = token + "not"
        //not properly loggin in
        const user = await request(server).get('/api/users/1').set("Authorization", token)
        expect(user.status).toBe(401);
    })
    it('should succeed in showing user', async () => {
        const data = {username: 'User', password: 'password'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        var token;
        const login = await request(server).post('/api/auth/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const user = await request(server).get('/api/users/1').set("Authorization", token)
        expect(user.status).toBe(200);
    })
})

describe('trip endpoint', () => {
    it('should create a trip', async () => {
        const data = {username: 'User', password: 'password'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        var token;
        const login = await request(server).post('/api/auth/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const trip = {
            user_id: 1,
            airport_id: 23,
            airline: 'United',
            departure_time: '3:30 PM',
            luggage: 1,
            children: 1
        }
        const userTrip = await request(server).post('/api/users/1/newtrip').set("Authorization", token).send(trip);
        expect(userTrip.status).toBe(201)
    })
    it('should get a created trip', async () => {
        const data = {username: 'User', password: 'password'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        var token;
        const login = await request(server).post('/api/auth/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const trip = {
            user_id: 1,
            airport_id: 23,
            airline: 'United',
            departure_time: '3:30 PM',
            luggage: 1,
            children: 1
        }
        const userTrip = await request(server).post('/api/users/1/newtrip').set("Authorization", token).send(trip);
        const getTrip = await request(server).get('/api/users/1/trips').set("Authorization", token)
        expect(getTrip.status).toBe(200)
    })
})

beforeEach(async () => {
    await (
        db('user_airport_worker').truncate(),
        db('users').truncate()    
        )
})