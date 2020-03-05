const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('register endpoint', () => {
    it('should fail to create new Admin', async () => {
        const res = await request(server).post('/api/admins/register')

        expect(res.status).toBe(500);
    })
    it('should create new User', async () => {
        const data = {username: 'Admin1', password: 'password'}
        const res = await request(server).post('/api/admins/register').send(data)

        expect(res.status).toBe(201);
    })
})

describe('login endpoint', () => {
    it('should fail to login new User', async () => {
        const data = {username: 'Admin2', password: 'password'}
        const newAdmin = await request(server).post('/api/admins/register').send(data)
        const wrongData = {username: 'SomebodyElse', password: 'wrong'}
        const res = await request(server).post('/api/admins/login').send(wrongData)
        expect(res.status).toBe(500);
    })
    it('should succeed in loggin in new User', async () => {
        const data = {username: 'Admin2', password: 'password'}
        const newAdmin = await request(server).post('/api/admins/register')
        .send(data)
        const res = await request(server).post('/api/admins/login').send(data)
        expect(res.status).toBe(200);
    })
})

describe('admin endpoint', () => {
    it('should fail in showing admin', async () => {
        const data = {username: 'Admin2', password: 'password'}
        const newAdmin = await request(server).post('/api/admins/register').send(data)
        var token;
        const login = await request(server).post('/api/admins/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        token = token + "not"
        //not properly loggin in
        const admin = await request(server).get('/api/admins/1').set("Authorization", token)
        expect(admin.status).toBe(401);
    })
    it('should succeed in showing user', async () => {
        const data = {username: 'Admin', password: 'password'}
        const newAdmin = await request(server).post('/api/admins/register').send(data)
        var token;
        const login = await request(server).post('/api/admins/login')
            .send(data)
            .then(res => {
                token = res.body.token
            })
        //properly loggin in
        const admin = await request(server).get('/api/admins/1').set("Authorization", token)
        expect(admin.status).toBe(200);
    })
})
beforeEach(async () => {
    await db('admin').truncate();
})

