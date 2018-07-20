require('dotenv').config({
    path: 'variable.env'
})
const express = require('express')
// const MongoClient =  require('mongodb').MongoClient
const bodyParser = require('body-parser')
// const db = require('./config/db')
const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

mongoose.connect(process.env.DATABASE)

mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

const Note = require('./models/Note')

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))

/*
    Routes for the api
*/

app.get('/notes', (req, res) => {
    Note.find({}, (err, items) => {
        if (err) {
            res.json({
                'error': 'An error has occurred'
            })
        } else {
            res.json(items)
        }
    })
})


app.get('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = {
        '_id': new ObjectID(id)
    }
    Note.findOne(details, (err, items) => {
        if (err) {
            res.json({
                'error': 'An error has occurred'
            })
        } else {
            res.json(items)
        }
    })
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = {
        '_id': new ObjectID(id)
    }
    Note.deleteOne(details, (err, items) => {
        if (err) {
            res.send({
                'error': 'An error has occurred'
            })
        } else {
            res.send(`Note ${id} deleted!!`)
        }
    })
})

app.put('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = {
        '_id': new ObjectID(id)
    }
    Note.findOneAndUpdate(details, req.body, {
        new: true
    }, (err, items) => {
        if (err) {
            res.send({
                'error': 'An error has occurred'
            })
        } else {
            res.json(items)
        }
    })
})

app.post('/notes', (req, res) => {
    Note.create(new Note(req.body), (err, results) => {
        if (err) {
            res.json({
                'error': 'An error has occurred'
            })
        } else {
            res.json(results)
        }
    })
})

// Test Route
app.post('/api', (req, res) => {
    res.json(req.body)
})

app.get('/api', (req, res) => {
    res.send('get Route to /api is working');
})

app.listen(7777, () => {
    console.log('App listening on port 7777!');
});