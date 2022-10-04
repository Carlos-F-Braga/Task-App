const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 20,
        validate(value) {
            if (value < 0)
            throw new Error('Age must be a positive number!')
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        default: '1234567',
        validate(pass) {
            if (pass.toLowerCase().includes('password')){
                throw new Error('Password is invalid because it includes "password"')
            }
            if (pass.length < 6){
                throw new Error('Password is invalid because it is too short')
            }
        }
    }
})

module.exports = User