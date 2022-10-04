require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('632e5413b2464c1f2c0bdf68', { age: 1 }).then((user) => {
    console.log('user', user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log('count', result)
}).catch((err) => {
    console.log(err)
})
