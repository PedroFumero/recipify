const fs = require('fs')
const path = require('path')
const { Recipe, User, Like } = require('../models')

class RecipesController {
  getHome = async (req, res) => {
    const recipes = await Recipe.findAll({
      include: {
        model: User,
        attributes: ['firstName', 'id'],
      },
      attributes: ['thumbnail', 'id', 'title'],
      // Extraer datos de modelo de usuario
    })
    // console.log(req.user)
    // console.log(recipes[0].user)
    res.render('home', { title: 'Home', searchBar: false, recipes })
  }

  getNewRecipe = (req, res) => {
    res.render('new-recipe', { title: 'Recipe' })
  }

  postNewRecipe = async (req, res, next) => {
    const recipe = await Recipe.create({
      ...req.body,
      thumbnail: req.file.filename,
      userId: req.user.id,
    })
    // console.log(req.file)
    return res.redirect(`/recipes/${recipe.id}/edit`)
  }

  getShowRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findByPk(recipeId, {
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    })

    if (!recipe) {
      return next()
    }

    res.render('show-recipe', {
      title: 'Recipe',
      recipe,
      date: new Date(recipe.createdAt).toLocaleDateString('pt-PT'),
    })
  }

  getEditRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findOne({
      where: { id: recipeId, userId: req.user.id },
    })

    if (!recipe) {
      return next()
    }

    res.render('edit-recipe', { title: 'Edit recipe', recipe })
  }

  postEditRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findOne({
      where: { id: recipeId, userId: req.user.id },
    })

    recipe.title = req.body.title
    recipe.minutes = req.body.minutes
    recipe.servings = req.body.servings
    recipe.ingredients = req.body.ingredients
    recipe.ingredientsList = req.body.ingredientsList
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

  likeRecipe = async (req, res, next) => {
    const { recipeId } = req.body

    const isLiked = await Like.findOne({
      where: { userId: req.user.id, recipeId },
    })

    if (!isLiked) {
      await Like.create({ recipeId, userId: req.user.id })
    } else {
      await Like.destroy({ where: { recipeId, userId: req.user.id } })
    }

    const counter = await Like.count({ where: { recipeId } })
    // console.log(counter)
    return res.json({ counter })
  }

  getLikes = async (req, res, next) => {
    const { recipeId } = req.params
    // console.log(recipeId)
    const counter = await Like.count({ where: { recipeId } })
    return res.json({ counter })
  }

  // Admin
  getAdmin = async (req, res, next) => {
    try {
      const recipes = await Recipe.findAll({ where: { userId: req.user.id } })
      res.render('admin', { title: 'Admin panel', recipes })
    } catch (error) {
      return next()
    }
  }
}

module.exports = new RecipesController()
