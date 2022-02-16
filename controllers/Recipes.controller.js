const fs = require('fs')
const path = require('path')
const { Recipe, User } = require('../models')

class RecipesController {
  getHome = async (req, res) => {
    const recipes = await Recipe.findAll({
      include: {
        model: User,
      },
      attributes: ['thumbnail', 'id', 'title'],
      // Extraer datos de modelo de usuario
    })
    console.log(recipes[0])
    res.render('home', { title: 'Home', searchBar: false, recipes })
  }

  getNewRecipe = (req, res) => {
    res.render('new-recipe', { title: 'Recipe' })
  }

  postNewRecipe = async (req, res, next) => {
    await Recipe.create({
      ...req.body,
      thumbnail: req.file.filename,
      userId: 1,
    })
    console.log(req.file)
    return res.redirect('/recipes/new')
  }

  getShowRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findByPk(recipeId)

    if (!recipe) {
      return next()
    }
    res.render('show-recipe', { title: 'Recipe', recipe })
  }

  getEditRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findByPk(recipeId)

    if (!recipe) {
      return next()
    }

    res.render('edit-recipe', { title: 'Edit recipe', recipe })
  }

  postEditRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findByPk(recipeId)

    recipe.title = req.body.title
    recipe.minutes = req.body.minutes
    recipe.servings = req.body.servings
    recipe.ingredients = req.body.ingredients
    recipe.ingredientsList = req.body.ingredientsList
    console.log()
    console.log(req.body.instructions)
    console.log()

    recipe.instructions = req.body.instructions

    if (req.file) {
      try {
        // Remove the previous thumbnail
        fs.unlinkSync(
          path.join(
            __dirname,
            '..',
            'public',
            'uploads',
            'thumbnails',
            recipe.thumbnail
          )
        )
        //file removed
        recipe.thumbnail = req.file.filename
      } catch (err) {
        console.log(err)
        // req.flash('error', err)
        return res.redirect('back')
      }
    }

    await recipe.save()

    res.redirect('back')
  }
}

module.exports = new RecipesController()
