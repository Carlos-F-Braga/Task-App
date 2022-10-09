const mongoose = require('mongoose')

const host = '127.0.0.1'
const port = '27017'

const connectionURL = process.env.MONGODB_URL

const database = process.env.NAME === 'DEV' ? '/task-manager-api' : '/test'

mongoose.connect(connectionURL + database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})