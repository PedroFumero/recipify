const express = require('express')
const { body } = require('express-validator')

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
  body('firstName').notEmpty().withMessage("First name can't be empty"),
  body('lastName').notEmpty().withMessage("Last name can't be empty"),
  body('email').notEmpty().withMessage("Email can't be empty"),
  UserController.postEditProfile
)

module.exports = Router
