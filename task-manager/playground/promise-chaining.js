require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('632e5413b2464c1f2c0bdf68', { age: 1 }).then((user) => {
//     console.log('user', user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log('count', result)
// }).catch((err) => {
//     console.log(err)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('632e5496c5bc19327cad8737', 27).then((count) => {
    console.log('count', count)
})