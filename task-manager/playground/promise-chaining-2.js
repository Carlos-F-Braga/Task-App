require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('632e720d5c73ac21d4532c32').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log('count', result)
}).catch((err) => {
    console.log(err)
})