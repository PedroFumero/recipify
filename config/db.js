const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'recipify2',
  username: 'root',
  password: '',
  port: '3306',
  // host: 'localhost',
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error)
//   })

module.exports = sequelize
