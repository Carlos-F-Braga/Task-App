const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require ('bcryptjs')

const userSchema = new mongoose.Schema({
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
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to Login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to Login!')
    }

    return user
}

//Hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User