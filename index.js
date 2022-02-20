const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/passport')
const app = express()

// Helpers
const { vardump } = require('./helpers')

// Importing routes
const { RecipeRoutes, AuthRoutes, UserRoutes } = require('./routes')
// Importing DB config
const db = require('./config/db')

// DB
// import models
require('./models')

// db.sync({ force: true })
db.sync()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

// Settings up
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares

// Cookie parser
app.use(cookieParser())
// Enabling sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
)
// Using passport
app.use(passport.initialize())
app.use(passport.session())

// Using flash
app.use(flash())

app.use((req, res, next) => {
  res.locals.vardump = vardump
  if (req.isAuthenticated()) {
    res.locals.authenticated = true
    res.locals.user = req.user
  }
  res.locals.messages = req.flash()
  next()
})

// Gettings info by POST method
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// Enabling static files
app.use(express.static(path.join(__dirname, 'public')))
// Enabling routes
app.use(RecipeRoutes)
app.use(AuthRoutes)
app.use(UserRoutes)

app.use('*', (req, res) => {
  res.render('404')
})

app.listen(3000, () => {
  console.log('App running on port', 3000)
})
