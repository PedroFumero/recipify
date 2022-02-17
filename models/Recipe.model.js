const Sequelize = require('sequelize')
const db = require('../config/db')

const User = require('./User.model.js')

const Recipe = db.define('recipe', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  title: Sequelize.STRING,
  minutes: Sequelize.INTEGER,
  servings: Sequelize.INTEGER,
  ingredients: Sequelize.INTEGER,
  ingredientsList: Sequelize.STRING(1000),
  instructions: Sequelize.TEXT,
  thumbnail: Sequelize.STRING,
})

// One to many relationship
User.hasMany(Recipe)
Recipe.belongsTo(User)

module.exports = Recipe
