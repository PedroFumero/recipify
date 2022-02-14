const path = require('path')
const express = require('express')
const app = express()

// Settings up
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home', { title: 'Home', searchBar: false })
})

app.get('/article', (req, res) => {
  res.render('article', { title: 'Article', searchBar: true })
})

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register', searchBar: true })
})

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
