// 1) import express
const express = require('express')

// import registerController file
const userController = require('./controller/userController')

// import project controller
const projectControlller = require('./controller/projectController')
const jwt = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

// 2) create an object for router class
const router = new express.Router()


// 3) set up path for each request from view

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// addproject
router.post('/addproject',jwt,multerConfig.single('projectimg'),projectControlller.addProjectController)

// all projects
router.get('/allprojects',jwt,projectControlller.getAllProjectController)

// home projects
router.get('/homeproject',projectControlller.homeProjectsController)

// userProject
router.get('/userProject',jwt,projectControlller.userProjectController)

// delete
router.delete('/delete/:id',projectControlller.deleteProjectController)

// 4) export the router
module.exports = router