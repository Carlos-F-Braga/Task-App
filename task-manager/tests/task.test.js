const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, userOne, userTwo, taskOne, taskTwo, taskThree, setupDatabase } = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('should get all tasks', async () => {
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

    expect(response.body.length).toEqual(3)
})

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
    await request(app).post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            descriptison: 'From my test'
        }).expect(400)
})

test('should get tasks from user', async () => {
    const response = await request(app).get('/tasks/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toEqual(2)
})

test('should get tasks by id', async () => {
    const response = await request(app).get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    console.log(response.body)
    expect(response.body).not.toBeNull()
})

test('should update tasks by id', async () => {
    const response = await request(app).patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        completed: true
    })
    .expect(200)

    expect(response.body.completed).toEqual(true)
    expect(response.body).not.toBeNull()
})

test('should delete tasks from user', async () => {
    await request(app).delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not delete tasks from other user', async () => {
    await request(app).delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
})