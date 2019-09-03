// import express from 'express'// ES2015 Modules syntax
const express = require('express');//equivalent to line above

//import the hubs-model file
const Hubs = require('./data/hubs-model'); //<<<<<< use Hubs to gain access tot he DB (database)
//Hubs has  find(), findById(), add(), remove(), update() methods

const server = express('');

const port = 8000;

//Route Handler: http GET requests to the / (root) URL
//req = request & res = response. They are banana names but the order is always the same. req first then response
server.get('/', (req, res) => {
    res.send('Hello Web 21')
})

//see a list aof Hubs (channel on Slack)

//create a Hub

//delete a Hub

//update a Hub


server.listen(port, () => console.log(`api running on port ${port}`));