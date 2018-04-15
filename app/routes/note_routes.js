const ObjectID = require('mongodb').ObjectID

module.exports = function(app, client) {
    const db = client.db('api-test')
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        db.collection('notes').findOne(details, (err, items) => {
            if(err) {
                res.send({ 'error': 'An error has occurred'})
            } else {
                res.send(items)
            }
        })
    })

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        db.collection('notes').remove(details, (err, items) => {
            if(err) {
                res.send({ 'error': 'An error has occurred'})
            } else {
                res.send(`Note ${id} deleted!!`)
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        const note = {text: req.body.body, title: req.body.title}
        db.collection('notes').update(details, note, (err, items) => {
            if(err) {
                res.send({ 'error': 'An error has occurred'})
            } else {
                res.send(items)
            }
        })
    })

    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title}
        db.collection('notes').insert(note, (err, results) => {
            if (err) {
                res.send({'error': 'An error has occurred'})
            } else {
                res.send(results.ops[0])
            }
        })
    })
}