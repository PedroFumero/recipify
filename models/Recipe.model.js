const Sequelize = require('sequelize')
const db = require('../config/db')

const Recipe = db.define('Recipe', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  title: Sequelize.STRING,
  minutes: Sequelize.INTEGER,
  servings: Sequelize.INTEGER,
  ingredients: Sequelize.INTEGER,
  ingredientsList: Sequelize.STRING,
  instructions: Sequelize.STRING,
})

module.exports = Recipe
