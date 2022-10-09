const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('../tests/fixtures/db')

beforeEach(setupDatabase)

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

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.png')
        .expect(200)

    const user = await User.findById(userOneId)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should get avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.png')
        .expect(200)

    const response = await request(app)
        .get('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    expect(response.body).toEqual(expect.any(Buffer))
})

test('should delete avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.png')
        .expect(200)

    const response = await request(app)
        .delete('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    expect(response.body).toEqual(expect.any(Buffer))
})

test('should update existing user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Carlao'
        }).expect(200)

    const user = await User.findById(userOneId)

    expect(user.name).toEqual('Carlao')
})

test('should not update existing user with wrong payload', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            names: 'Carlao'
        }).expect(400)
})

test('should not update not authenticated user', async () => {
    await request(app).post('/users/login').send({
        email: 'cara@#ero.corie',
        password: 'kpitoa'
    }).expect(400)
})
test('should not update not authenticated user', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Carlao'
        }).expect(401)
})

test('should get user profile by id', async () => {
    const response = await request(app)
        .get(`/users/${userOneId}`)
        .send()
        .expect(200)

    expect(response.body.name).toEqual('Mike')
})

test('should not get user profile with fake id', async () => {
    await request(app)
        .get(`/users/${userOneId}1`)
        .send()
        .expect(500)
})

test('should update user profile by id', async () => {
    const response = await request(app)
        .patch(`/users/${userOneId}`)
        .send()
        .send({
            name: 'Carlao'
        }).expect(200)

    expect(response.body.name).toEqual('Carlao')
})

test('should not update user profile with wrong payload', async () => {
    await request(app)
        .patch(`/users/${userOneId}`)
        .send()
        .send({
            names: 'Carlao'
        }).expect(400)
})

test('should not get user profile with fake id', async () => {
    await request(app)
        .patch(`/users/${userOneId}1`)
        .send({
            name: 'Carlao'
        }).expect(400)
})

test('should delete user profile by id', async () => {
    const response = await request(app)
        .delete(`/users/${userOneId}`)
        .send()
        .expect(200)

    expect(response.body.name).toEqual('Mike')

    const user = await User.findById(userOneId)

    expect(user).toBeNull()
})

test('should not get user profile with fake id', async () => {
    await request(app)
        .delete(`/users/${userOneId}1`)
        .send()
        .expect(400)
})