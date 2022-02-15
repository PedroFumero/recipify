const express = require('express')
const Router = express.Router()

const { RecipesController } = require('../controllers')

// Home
Router.get('/', RecipesController.getHome)

// New item
Router.get('/recipes/new', RecipesController.getNewRecipe)
Router.post('/recipes/new', RecipesController.postNewRecipe)

// Show item
Router.get('/recipes/:recipeId', RecipesController.getShowRecipe)

module.exports = Router
