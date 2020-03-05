const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('worker endpoint', () => {
    it('should fail in showing worker', async () => {
        const data = {username: 'Worker', password: 'password'}
        const newWorker = await request(server).post('/api/workers/register').send(data)
        var token;
        const login = await request(server).post('/api/workers/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        token = token + "not"
        //not properly loggin in
        const worker = await request(server).get('/api/workers/1').set("Authorization", token)
        expect(worker.status).toBe(401);
    })
    it('should succeed in showing worker', async () => {
        const data = {username: 'Worker', password: 'password'}
        const newWorker = await request(server).post('/api/workers/register').send(data)
        var token;
        const login = await request(server).post('/api/workers/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const worker = await request(server).get('/api/workers/1').set("Authorization", token)
        expect(worker.status).toBe(200);
    })
})

describe('trip endpoint', () => {
    it('should get a list of assigned trips', async () => {
        const data = {username: 'Worker', password: 'password'}
        const newWorker = await request(server).post('/api/workers/register').send(data)
        var token;
        const login = await request(server).post('/api/workers/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const getTrip = await request(server).get('/api/workers/1/trips').set("Authorization", token)
        expect(getTrip.status).toBe(200)
    })
})

beforeEach(async () => {
    await db('workers').truncate();
})