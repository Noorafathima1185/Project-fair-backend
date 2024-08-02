// 1) import express
const express = require('express')

// import registerController file
const userController = require('./controller/userController')

// import project controller
const projectController = require('./controller/projectController')
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
router.post('/addproject',jwt,multerConfig.single('projectimg'),projectController.addProjectController)

// all projects
router.get('/allprojects',jwt,projectController.getAllProjectController)

// home projects
router.get('/homeproject',projectController.homeProjectsController)

// userProject
router.get('/userProject',jwt,projectController.userProjectController)

// delete
router.delete('/delete/:id',projectController.deleteProjectController)

// edit project
router.put('/editproject/:id',jwt,multerConfig.single('projectimg'),projectController.editProjectController)

// edit profile
router.put('/editprofile',jwt,multerConfig.single('profile'),userController.editProfileController)

// 4) export the router
module.exports = router