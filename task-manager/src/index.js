const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const bp = require('body-parser')

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((err) => {
    //     res.status(500).send()
    // })
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    console.log(_id)
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        return res.status(500).send(e)
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(user)
    // }).catch((err) => {
    //     return res.status(500).send()
    // })
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    await task.save()

    try {
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

app.get('/tasks', async (req, res) => {

    const tasks = await Task.find({})

    try {
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.status(200).send(tasks)
    // }).catch((err) => {
    //     res.status(500).send()
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    const task = await Task.findById(_id)

    try {
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        return res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(task)
    // }).catch((err) => {
    //     return res.status(500).send()
    // })
})


app.listen(port, () => {
    console.log('Server is listening on port', port )
})