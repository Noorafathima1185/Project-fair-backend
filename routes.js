// 1) import express
const express = require('express')
// import registerController file
const userController = require('./controller/userController')


// 2) create an object for router class
const router = new express.Router()


// 3) set up path for each request from view

// register
router.post('/register',userController.registerController)


// 4) export the router
module.exports = router