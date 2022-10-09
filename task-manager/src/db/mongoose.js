const mongoose = require('mongoose')

const host = '127.0.0.1'
const port = '27017'

const connectionURL = process.env.MONGODB_URL

mongoose.connect(connectionURL + '/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})