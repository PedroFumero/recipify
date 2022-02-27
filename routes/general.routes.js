const express = require('express')
const Router = express.Router()

const { GeneralController } = require('../controllers')

Router.get('/about', GeneralController.getAboutPage)

module.exports = Router
