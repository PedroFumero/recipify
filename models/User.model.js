const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../config/db')

// const Recipe = require('./Recipe.model.js')

const User = db.define(
  'user',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "First name can't be empty",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Last name can't be empty",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        msg: 'Email already registered',
      },
      validate: {
        isEmail: {
          msg: 'Add a valid Email',
        },
        notEmpty: {
          msg: "Email can't be empty",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Password can't be empty",
        },
      },
    },
    token: {
      type: Sequelize.STRING(64),
    },
    expiration: {
      type: Sequelize.DATE,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
      },
    },
  }
)

User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = User
