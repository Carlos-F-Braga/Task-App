require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('632e720d5c73ac21d4532c32').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log('count', result)
// }).catch((err) => {
//     console.log(err)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndUpdate(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('633cbbf64c3ffd29d06abf42').then((count) => {
    console.log('count', count)
}).catch(e => console.log(e))