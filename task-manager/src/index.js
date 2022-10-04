const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const bp = require('body-parser')

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })

})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((err) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }).catch((err) => {
        return res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((err) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((err) => {
        return res.status(500).send()
    })
})


app.listen(port, () => {
    console.log('Server is listening on port', port )
})