const express = require('express')
require('./db/mongoose')
const bp = require('body-parser')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is listening on port', port )
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red1s2345!', hashedPassword)
    console.log(isMatch)
}

myFunction()