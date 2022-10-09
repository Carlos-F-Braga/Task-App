const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

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

const userTwoId = new mongoose.Types.ObjectId
const userTwo =  {
    _id: userTwoId,
    name: 'Andro',
    email: 'Andro@m3ke.com',
    password: '1234567',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}