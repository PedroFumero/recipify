const express = require('express')
const { body } = require('express-validator')
const Router = express.Router()

const multer = require('multer')
const multerConfig = require('../config/multer')

// Multer middleware
const upload = multer({
  storage: multerConfig.storageConfig,
  fileFilter: multerConfig.fileFilterConfig,
})

const { RecipesController, AuthController } = require('../controllers')

// Home
Router.get('/', RecipesController.getHome)

// New item
Router.get(
  '/recipes/new',
  AuthController.isAuthenticated,
  RecipesController.getNewRecipe
)
Router.post(
  '/recipes/new',
  AuthController.isAuthenticated,
  upload.single('thumbnail'),
  RecipesController.postNewRecipe
)

// Show item
Router.get('/recipes/:recipeId', RecipesController.getShowRecipe)

// Edit item
Router.get(
  '/recipes/:recipeId/edit',
  AuthController.isAuthenticated,
  RecipesController.getEditRecipe
)
Router.post(
  '/recipes/:recipeId/edit',
  AuthController.isAuthenticated,
  upload.single('thumbnail'),
  RecipesController.postEditRecipe
)

// Likes
Router.get('/recipes/like/:recipeId', RecipesController.getLikes)
Router.post(
  '/recipes/like',
  AuthController.isAuthenticated,
  RecipesController.likeRecipe
)

// Admin
Router.get('/admin', AuthController.isAuthenticated, RecipesController.getAdmin)

// Delete
Router.delete('/recipes/delete', RecipesController.deleteRecipe)

// Search
Router.get('/search', body('term').trim().escape(), RecipesController.getSearch)

module.exports = Router
