// import dotenv - to load environment variable.
require('dotenv').config()


// import express
const express = require('express')


// import cors
const cors = require('cors')

// import router
const router = require('./routes')

// import connectio.js
require('./connection')


// create express server
// creates an express application. the express() function is a top-level function exported by the express module.
const pfServer = express()


// use of cors - to communicate with the view.
pfServer.use(cors())


// server should use json() - returns a middleware which can parse json format.
pfServer.use(express.json()) // Returns middleware that only parses json and only looks at requests where the Content


// use router
pfServer.use(router)


// set port for the server
PORT = 4000 || process.env.PORT


// listen to the port - to resolve the request
pfServer.listen(PORT,()=>{
    console.log(`server running successfully at port number : ${PORT}`);
})


// get request
/* pfServer.get('/',(req,res)=>{
    // logic
    res.send('get request recieved')
}) */


// post request
/* pfServer.post('/',(req,res)=>{
    // logic
    res.send('post request recieved')
}) */

// put request
/* pfServer.put('/',(req,res)=>{
    // logic
    res.send('put request recieved')
}) */