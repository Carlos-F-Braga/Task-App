const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const bp = require('body-parser')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
app.use(userRouter)
app.use(taskRouter)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is listening on port', port )
})