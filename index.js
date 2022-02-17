const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

// Helpers
const { vardump } = require('./helpers')

// Importing routes
const { RecipeRoutes, AuthRoutes } = require('./routes')
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
// Using flash
app.use(flash())

app.use((req, res, next) => {
  res.locals.vardump = vardump
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

app.get('/article', (req, res) => {
  res.render('article', { title: 'Article', searchBar: true })
})

// app.get('/register', (req, res) => {
//   res.render('register', { title: 'Register', searchBar: true })
// })

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login', searchBar: true })
})

app.get('/create-recipe', (req, res) => {
  res.render('recipes/create-recipe', {
    title: 'Create recipe',
    searchBar: true,
  })
})

app.get('/admin', (req, res) => {
  res.render('admin', { title: 'Admin panel' })
})

app.get('/edit-profile', (req, res) => {
  res.render('edit-profile', { title: 'Edit profile' })
})

app.listen(3000, () => {
  console.log('App running on port', 3000)
})
