const Sequelize = require('sequelize')
const db = require('../config/db')

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
  },
  { timestamps: false }
)

module.exports = Category
