const express = require('express')
const Router = express.Router()

const { UserController, AuthController } = require('../controllers')

Router.get(
  '/edit-profile',
  AuthController.isAuthenticated,
  UserController.getEditProfile
)

Router.post(
  '/edit-profile',
  AuthController.isAuthenticated,
  UserController.postEditProfile
)

module.exports = Router
