const path = require('path')
const Sequelize = require('sequelize')

require('dotenv').config({ path: path.join(__dirname, '..', 'variables.env') })

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  logging: false,
})

module.exports = sequelize
