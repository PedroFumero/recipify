const { Recipe } = require('../models')

class RecipesController {
  getHome = async (req, res) => {
    const recipes = await Recipe.findAll()
    res.render('home', { title: 'Home', searchBar: false, recipes })
  }

  getNewRecipe = (req, res) => {
    res.render('new-recipe', { title: 'Recipe' })
  }

  postNewRecipe = async (req, res, next) => {
    await Recipe.create({
      ...req.body,
      thumbnail: req.file.filename,
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
}

module.exports = new RecipesController()
