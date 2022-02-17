const Sequelize = require('sequelize')
const db = require('../config/db')

const User = require('./User.model')
const Recipe = require('./Recipe.model')

const Like = db.define('like', {}, { timestamps: false })

Like.belongsTo(User, { through: 'like' })
Like.belongsTo(Recipe, { through: 'like' })

module.exports = Like
