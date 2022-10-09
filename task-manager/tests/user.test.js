const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')


beforeEach(async () => {
    await User.deleteMany()
})

test('should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Carlos',
        email: 'Carlois@egeru.com.br',
        password: '123478593'
    }).expect(201)
})