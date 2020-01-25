const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')
const bodyParser = require('body-parser')
const assert = require('assert')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

///**** MONGO DRIVER ****///
const mongo_url = 'mongodb://localhost:27017'
const dataBase = "last_checkpoint"

MongoClient.connect(mongo_url, (err, client ) => {
    assert.equal(err, null, 'data base connection failed')
    const db = client.db(dataBase)

    //** ADD CONTACT **//
    app.post('/add', (req, res) => {
        console.log('req add :', req.body)
        const contactToAdd = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        }
        // let newContact = req.body
        db.collection('contacts').insertOne(contactToAdd, (err, data) => {
            if (err) res.send('cannot add contact')
            else res.send('contact added')
        })
    })
    //** GET ALL CONTACTS **//
    app.get('/liste', (req, res) => {
        db.collection('contacts').find().toArray((err, data) => {
            if (err) res.send('cannot fecth contacts')
            else res.send(data)
        })
    })
    //** GET ONE CONTACT **//
    app.get('/read/:id', (req, res) => {
        let searchedContactId = ObjectID(req.params.id)
        db.collection('contacts').findOne({_id: searchedContactId}, (err, data) => {
            if (err) res.send('cannot fetch contact')
            else res.send(data)
        })
    })
    //** MODIFY ONE CONTACT **//
    app.put('/update/:id', (req, res) => {
        console.log('req: ', req);
        let IdModify = ObjectID(req.params.id)
        const contactToModify = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        }
        
        db.collection('contacts').findOneAndUpdate(
            {_id: IdModify},
            {
                $set: {
                    ...contactToModify
                }
            },
            (err, data) => {
                if (err) res.send('cannot modify contact')
                else res.send('contact was modified')
            }
        )
    })
    //** DELETE ONE CONTACT **//
    app.delete('/delete/:id', (req, res) => {
        let ContactToRemove = ObjectID(req.params.id)
        db.collection('contacts').findOneAndDelete(
            {_id: ContactToRemove},
            (err, data) => {
                if (err) res.send('cannot delete contact')
                else res.send('contact was deleted')
            }
        )
    })
})

app.listen(5000, (err) => {
    if(err) console.log("server err")
    else console.log("server is running on port 5000")
})