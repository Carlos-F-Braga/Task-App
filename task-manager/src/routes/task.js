const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
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

router.get('/tasks/me', auth, async (req, res) => {

    const tasks = await Task.find({ owner: req.user._id })
    // await req.user.populate('tasks').execPopulate()

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

router.get('/tasks', async (req, res) => {

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

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id})

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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
        return res.status(400).send({error: 'Invalid updates!'})

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, })
        
        if (!task) {
            return res.status(404).send('No task exists')
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(200).send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        
        if (!task) {
            return res.status(404).send('No task exists')
        }

        res.status(200).send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})


module.exports = router