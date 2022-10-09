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
    const response = await request(app).post('/users').send({
        name: 'Carlos',
        email: 'carlois@egeru.com.br',
        password: '123478593'
    }).expect(201)

    const user = await User.findById(response.body.user._id)

    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: 'Carlos',
            email: 'carlois@egeru.com.br'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toEqual('123478593')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)

    expect(response.body.token).toEqual(user.tokens[1].token)
})

test('should not login not existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'cara@#ero.corie',
        password: 'kpitoa'
    }).expect(400)
})

test('should get user profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should not get user profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        
    const user = await User.findById(userOneId)

    expect(user).toBeNull()
})


test('should not delete user profile for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})