const { User } = require('../models')

class AuthController {
  getRegister = (req, res) => {
    res.render('Register', { title: 'Register' })
  }

  postRegister = async (req, res, next) => {
    const { firstName, lastName, email, password, password2 } = req.body

    if (password !== password2) {
      req.flash('error', "Passwords doesn't match")
      return res.render('register', {
        title: 'Register',
        messages: req.flash(),
        firstName,
        lastName,
        email,
      })
    }

    try {
      await User.create({
        firstName,
        lastName,
        email,
        password,
      })
    } catch (error) {
      const errors = error.errors.map((error) => error.message)
      req.flash('error', errors)

      return res.render('register', {
        title: 'Register',
        messages: req.flash(),
        firstName,
        lastName,
        email,
      })
    }

    req.flash('success', 'Account created succesfully, you can login.')
    res.redirect('/login')
  }
}

module.exports = new AuthController()
