const express = require('express')
const Router = express.Router()

const { AuthController } = require('../controllers')

// Register
Router.get('/register', AuthController.getRegister)
Router.post('/register', AuthController.postRegister)

// Login
Router.get('/login', AuthController.getLogin)
Router.post('/login', AuthController.postLogin)

// Logout
Router.get('/logout', AuthController.logOut)

module.exports = Router
