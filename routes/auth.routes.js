const express = require('express')
const Router = express.Router()
const { body } = require('express-validator')

const { AuthController } = require('../controllers')
const extractErrors = require('../helpers/extract-errors')

// Register
Router.get('/register', AuthController.getRegister)
Router.post(
  '/register',
  body('firstName')
    .notEmpty()
    .withMessage('First name cannot be empty')
    .trim()
    .escape(),
  body('lastName')
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .trim()
    .escape(),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage("It' not a valid email")
    .trim()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Minimun length is 5 characters on password')
    .escape(),
  body('password2')
    .notEmpty()
    .withMessage('Password confirmation cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Minimun length is 5 characters on password confirmation')
    .escape(),
  extractErrors,
  AuthController.postRegister
)

// Login
Router.get('/login', AuthController.getLogin)
Router.post(
  '/login',
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage("It' not a valid email")
    .trim(),
  body('password').notEmpty().withMessage('Password cannot be empty').trim(),
  extractErrors,
  AuthController.postLogin,
  AuthController.forceSaveSession
)

// Logout
Router.get('/logout', AuthController.logOut)

// Reset password
Router.get('/forgot-password', AuthController.getForgotPassword)
Router.post(
  '/forgot-password',
  body('email').notEmpty().withMessage('Email cannot be empty'),
  extractErrors,
  AuthController.postForgotPassword
)
Router.get('/forgot-password/:token', AuthController.getEnablingToken)
Router.post(
  '/reset-password',
  body('password')
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 5 })
    .withMessage('Password needs to have 5 characters min'),
  body('password2')
    .notEmpty()
    .withMessage("Password confirmation can't be empty")
    .isLength({ min: 5 })
    .withMessage('Password needs to have 5 characters min'),
  extractErrors,
  AuthController.postResetPassword
)

module.exports = Router
