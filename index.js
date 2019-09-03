// import express from 'express'// ES2015 Modules syntax
const express = require('express');//equivalent to line above

//import the hubs-model file
const Hubs = require('./data/hubs-model'); //<<<<<< use Hubs to gain access tot he DB (database)
//Hubs has  find(), findById(), add(), remove(), update() methods

const server = express('');

// <<<<< add the following line to reach express to parse JSON
server.use(express.json());

const port = 8000;

//Route Handler: http GET requests to the / (root) URL
//req = request & res = response. They are banana names but the order is always the same. req first then response
server.get('/', (req, res) => {
    res.send('Hello Web 21')
})

//see a list aof Hubs (channel on Slack) /hubs
server.get('/hubs', (req, res) => {
    //Hubs.find() returns a promise, we need the bros [.then().catch()]
    Hubs.find()
    .then(hubs => {
        //.json will convert the data passed to JSON before sending to the client
        //also tells the client we're sending JSON through and HTTP header
        res.status(200).json(hubs);
    })
    .catch( err => {
        res.status(500).json({message: 'error getting the list of hubs', err})
    })
})

//create a Hub
server.post('/hubs', (req, res) => {
    //axios.post('/hubs', hubData).then().catch();
    // http message is an object with headers and body => { headers:{}, body: {// data sent by client } }
    const hubInformation = req.body;

    console.log('hub info from body', hubInformation);//allows us to see if the variable is defined in the terminal

    Hubs.add(hubInformation)
    .then(result => {
        res.status(201).json(result);
    })
    .catch( err => {
        res.status(500).json({message: 'error adding the hub', err})
    })
})

//delete a Hub /hub/6
server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id;

    Hubs.remove(hubId)
        .then(result => {
            res.status(200).json( {message: 'hub deletion success'} );
        })
        .catch( err => {
            res.status(500).json({message: 'error removing the hub', err})
        })
})

//update a Hub
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Hubs.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json( {message: 'hub not found'} )
            }
        })
        .catch( err => {
            res.status(500).json({message: 'error updating hub', err})
        })
})

server.listen(port, () => console.log(`api running on port ${port}`));