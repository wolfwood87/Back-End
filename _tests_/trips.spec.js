const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('trip endpoint', () => {
    it('should get trip', async () => {
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
        const getTrips = await request(server).get('/api/trips/').set("Authorization", token)
        expect(getTrips.status).toBe(200)
    })
    it('should change trip', async () => {
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
        const newData = {
            airline: "Southwest"
        }
        const newTrip = await request(server).post('/api/users/1/newtrip').set("Authorization", token).send(trip);
        const changeTrip = await request(server).put('/api/trips/2').set("Authorization", token).send(newData)
        const getTrips = await request(server).get('/api/trips/2').set("Authorization", token)
        expect(getTrips.text).toMatch(/Southwest/)
    })
    it('should delete trip', async () => {
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
        const delTrips = await request(server).delete('/api/trips/1').set("Authorization", token)
        expect(delTrips.status).toBe(204)
    })
})
    beforeEach(async () => {
        await (
            db('user_airport_worker').truncate(),
            db('users').truncate()    
            )
    })
