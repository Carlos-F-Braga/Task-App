const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')

const upload = multer({
  dest: 'avatar',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error('File must be a Image'))
    }
    cb(undefined, true)
  }
})

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
})

router.post('/users/login', async (req, res) => { 
try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
} catch (e) {
    res.status(400).send(e)
}
})

router.post('/users/logout', auth,  async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token //reoving the token in use from the array of all tokens
        })

        await req.user.save()

        res.status(200).send('Logout Sucessful!')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth,  async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.status(200).send('Logout All Sucessful!')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', auth, async (req, res) => {

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

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
        return res.status(400).send({error: 'Invalid updates!'})

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        
        if (!req.user) {
            return res.status(404).send('No user exists')
        }

        res.status(200).send(req.user)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
        return res.status(400).send({error: 'Invalid updates!'})

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, })
        
        if (!user) {
            return res.status(404).send('No user exists')
        }

        res.status(200).send(user)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        
        // if (!user) {
        //     return res.status(404).send('No user exists')
        // }

        await req.user.remove()

        res.status(200).send(req.user)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        
        if (!user) {
            return res.status(404).send('No user exists')
        }

        res.status(200).send(user)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.post('/users/me/avatar', upload.single('avatar'),  (req, res) => {
    res.send()
  })


module.exports = router