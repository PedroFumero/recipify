const express = require('express')
const Router = express.Router()

const multer = require('multer')
const multerConfig = require('../config/multer')

// Multer middleware
const upload = multer({
  storage: multerConfig.storageConfig,
  fileFilter: multerConfig.fileFilterConfig,
})

const { RecipesController } = require('../controllers')

// Home
Router.get('/', RecipesController.getHome)

// New item
Router.get('/recipes/new', RecipesController.getNewRecipe)
Router.post(
  '/recipes/new',
  upload.single('thumbnail'),
  RecipesController.postNewRecipe
)

// Show item
Router.get('/recipes/:recipeId', RecipesController.getShowRecipe)

// Edit item
Router.get('/recipes/:recipeId/edit', RecipesController.getEditRecipe)
Router.post(
  '/recipes/:recipeId/edit',
  upload.single('thumbnail'),
  RecipesController.postEditRecipe
)

module.exports = Router
