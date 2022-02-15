const express = require('express')
const Router = express.Router()

const { AuthController } = require('../controllers')

// Register
Router.get('/register', AuthController.getRegister)
Router.post('/register', AuthController.postRegister)

module.exports = Router
