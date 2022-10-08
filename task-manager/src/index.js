const express = require('express')
require('./db/mongoose')
const bp = require('body-parser')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET REQUEST DISABLED')
//     } else {
//         next()
//     }
// })

app.use((req, res, next) => {
    if (req.method) {
        res.status(503).send('SHUT DOWN')
    } else {
        next()
    }
})

app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is listening on port', port )
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', {expiresIn: '77 days'})
    console.log(token)

    console.log(jwt.verify(token, 'thisismynewcourse'))
}

myFunction();