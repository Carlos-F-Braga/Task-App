const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, userOne, setupDatabase } = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('should create task for user', async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'From my test'
    }).expect(201)

    const task = await Task.findById(response.body._id)

    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('should fail to create task for user with wrong payload', async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        descriptison: 'From my test'
    }).expect(400)
})