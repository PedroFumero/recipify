const fs = require('fs')
const path = require('path')
const { Recipe, User, Like, Category } = require('../models')
const sequelize = require('sequelize')

class RecipesController {
  getHome = async (req, res) => {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'id'],
        },
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['thumbnail', 'id', 'title'],
      order: [['id', 'DESC']],
    })
    // console.log(recipes[0].category)
    res.render('home', { title: 'Home', searchBar: false, recipes })
  }

  getNewRecipe = async (req, res) => {
    const categories = await Category.findAll()
    res.render('new-recipe', { title: 'Recipe', categories })
  }

  postNewRecipe = async (req, res, next) => {
    try {
      const recipe = await Recipe.create({
        ...req.body,
        thumbnail: req.file.filename,
        userId: req.user.id,
        categoryId: req.body.category,
      })
      // console.log(req.file)
      return res.redirect(`/recipes/${recipe.id}/edit`)
    } catch (error) {
      req.flash('error', ['Thumbnail is required'])
      return res.redirect('back')
    }
  }

  getShowRecipe = async (req, res, next) => {
    const { recipeId } = req.params
    const recipe = await Recipe.findByPk(recipeId, {
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    })

    const similarRecipes = await Recipe.findAll({
      where: { categoryId: recipe.categoryId },
      limit: 4,
    })

    if (!recipe) {
      return next()
    }

    res.render('show-recipe', {
      title: 'Recipe',
      recipe,
      date: new Date(recipe.createdAt).toLocaleDateString('pt-PT'),
      searchBar: true,
      similarRecipes,
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
      const recipes = await Recipe.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
      })
      res.render('admin', { title: 'Admin panel', recipes })
    } catch (error) {
      return next()
    }
  }

  deleteRecipe = async (req, res, next) => {
    const { recipeId } = req.body
    const deleted = await Recipe.destroy({
      where: { id: recipeId, userId: req.user.id },
    })

    if (!deleted) {
      return res.json({ status: 403 })
    }

    res.json({ status: 200 })
  }

  getSearch = async (req, res) => {
    const term = req.query.term.toLowerCase()
    const searchResults = await Recipe.findAll({
      where: {
        title: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('title')),
          'LIKE',
          `%${term}%`
        ),
      },
    })
    res.render('search', { title: 'Search', searchBar: true, searchResults })
  }
}

module.exports = new RecipesController()
