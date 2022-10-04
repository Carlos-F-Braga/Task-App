const {MongoClient, ObjectID} = require('mongodb')
const express = require('express')

const app = express()

// const id = new ObjectID().valueOf()
// console.log(id)

const host = '127.0.0.1'
const port = '27017'

const connectionURL = 'mongodb://' + host + ':' + port
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log(error, 'Unable to connect to database!')
    }

    const db = client.db(databaseName)



    // C.R.U.D.
    //delete

    // db.collection('tasks').deleteOne({
    //     _id: new ObjectID('630d6d1390873f14e827de2a')
    // }).then(res => {console.log(res)}).catch(err => console.log(err))

    // db.collection('tasks').deleteMany({
    //     completed: false
    // }).then(res => {console.log(res)}).catch(err => console.log(err))


    //update

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then(res => console.log(res)).catch(err => console.log(err))

    // db.collection('users').updateOne({
    //     _id: new ObjectID('630d678808a0422914729787')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then(result => {
    //     console.log('deu update')
    // }).catch(err => {
    //      console.log(err)
    // })
    
    // find

    //     db.collection('tasks').findOne({_id: new ObjectID('630d6d1390873f14e827de2a')}, (error, task) => {
    //     if (error){
    //         return console.log('Unable to fetch data!')
    //     }
    //     console.log(task)
    // })

    //     db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if (error)
    //     return console.log(error)
        
    //     console.log(tasks)
    // })

    // db.collection('users').findOne({_id: new ObjectID('630d678808a0422914729787')}, (error, user) => {
    //     if (error){
    //         return console.log('Unable to fetch data!')
    //     }
        
    //     console.log(user)
    // })

    // db.collection('users').find({age: 20}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({age: 20}).count((error, count) => {
    //     console.log('quantity of results:', count)
    // })


    // create

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Carlosa',
    //     age: 20
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to connect to server!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jane',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunter',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) throw error
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'This is a description',
    //         completed: true
    //     },
    //     {
    //         description: 'El mosco has mama',
    //         completed: false
    //     },        {
    //         description: 'Take out the trash',
    //         completed: true
    //     },
    //     {
    //         description: 'El mosco has dancing',
    //         completed: false
    //     },    
    //     {
    //         description: 'This is a localhost',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) throw error
    //     console.log(result.ops)
    // })

    console.log('Sucessfully connected to server!')
})