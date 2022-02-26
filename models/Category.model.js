const Sequelize = require('sequelize')
const db = require('../config/db')

const Recipe = require('./Recipe.model')

const Category = db.define(
  'category',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    thumbnail: Sequelize.STRING,
  },
  { timestamps: false }
)

Category.hasOne(Recipe)
Recipe.belongsTo(Category)

module.exports = Category
