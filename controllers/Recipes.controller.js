const { Recipe } = require('../models')

class RecipesController {
  getHome = (req, res) => {
    res.render('home', { title: 'Home', searchBar: false })
  }

  getNewRecipe = (req, res) => {
    res.render('new-recipe', { title: 'Recipe' })
  }

  postNewRecipe = async (req, res, next) => {
    const recipe = await Recipe.create(req.body)
    console.log(recipe)
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
