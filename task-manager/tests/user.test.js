const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId

const userOne =  {
    _id: userOneId,
    name: 'Mike',
    email: 'Mike@make.com',
    password: '1234567',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Carlos',
        email: 'Carlois@egeru.com.br',
        password: '123478593'
    }).expect(201)
})

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login not existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'cara@#ero.corie',
        password: 'kpitoa'
    }).expect(400)
})