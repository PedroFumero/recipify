const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Reference to the model to authenticate
const { User } = require('../models')

// Local strategy - Login with email and password
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })
        // Verify password
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'Incorrect password' })
        }
        // All it's OK
        return done(null, user)
      } catch (error) {
        return done(null, false, {
          message: "Email don't exist on our database",
        })
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'firstName', 'lastName', 'email'],
  })
  done(null, user)
})

module.exports = passport
