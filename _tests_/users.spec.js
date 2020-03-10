const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('user endpoint', () => {
    it('should fail in showing user', async () => {
        jest.setTimeout(30000)
        const data = {username: 'test1', password: 'password'}
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
        const data = {username: 'test1', password: 'password'}
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





// beforeEach(async () => {
//     await db('users').truncate();
// })