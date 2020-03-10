const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('register endpoint', () => {
    it('should fail to create new User', async () => {
        
        const res = await request(server).post('/api/auth/register')

        expect(res.status).toBe(500);
    })
    it('should create new User', async () => {
        let newData = {username: 'JimmyDean4', password: 'password'}
        const res = await request(server).post('/api/auth/register').send(newData)

        expect(res.status).toBe(201);
    })
})


describe('login endpoint', () => {
    it('should login new User', async () => {
        const data = {username: 'JimmyDean', password: 'password'}
        const newUser = await request(server).post('/api/auth/register').send(data)
        
        const res = await request(server).post('/api/auth/login').send(data)
        expect(res.status).toBe(200);
    })
    it('should fail in loggin in new User', async () => {
        const data = {username: 'JimmyDean2', password: 'password'}
        const newUser = await request(server).post('/api/auth/register')
        .send(data)
        const wrongData = {username: 'SomebodyElse', password: 'wrong'}
        const res = await request(server).post('/api/auth/login').send(wrongData)
        expect(res.status).toBe(500);
    })
})
// beforeEach(async () => {
//     await db('users').truncate();
// })

