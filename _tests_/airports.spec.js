const request = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');

describe('airports endpoint', () => {
    it('should retrieve airports', async () => {
        const airport = await request(server).get('/api/airports/')

        expect(airport.status).toBe(200)
    })

    it('should retrieve specific airport', async () => {
        const airport = await request(server).get('/api/airports/3777')

        expect(airport.text).toMatch(/SAN FRANCISCO/)
    })
})
