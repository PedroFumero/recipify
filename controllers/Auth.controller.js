const crypto = require('crypto')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { Op } = require('sequelize')
const { User } = require('../models')
const sendEmail = require('../helpers/send-email')

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

  getLogin = (req, res) => {
    res.render('login', { title: 'Login', searchBar: true })
  }

  postLogin = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  })

  isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login')
    }
    next()
  }

  logOut = (req, res, next) => {
    req.session.destroy(() => {
      return res.redirect('/login')
    })
  }

  getForgotPassword = (req, res) => {
    res.render('forgot-password', { title: 'Forgot password' })
  }

  postForgotPassword = async (req, res, next) => {
    const { email } = req.body
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        req.flash('error', "Email don't registered")
        return res.redirect('back')
      }

      // Generating token and expiration
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          throw err
        }

        const token = buffer.toString('hex')
        const expiration = Date.now() + 60 * 60 * 1000 // 60 seconds by 60 minutes by 1000 miliseconds = now + 1 hour

        user.token = token
        user.expiration = expiration

        await user.save()
        sendEmail({
          from: 'Recipify <no-reply@recipify.com>',
          to: email,
          subject: 'Generate new password',
          text: `You've requested for a password, now you can click the following link...`,
          html: `You've requested for a password, now you can click the following link to create a new password <a href="http://${req.headers.host}/forgot-password/${token}">Click here</a>.
          <br/>
          <br/>
          If you can't open the previous link you can copy and paste the following link on your browser search bar: http://${req.headers.host}/forgot-password/${token}
          <br/>
          <br/>
          (The link will be available for an hour, then the link will be invalid and you will need to generate a new one)`,
        })

        req.flash('success', 'Email was sent successfully, check your email')
        return res.redirect('back')
      })
    } catch (error) {
      req.flash('error', 'Something went wrong')
      return res.redirect('back')
    }
  }

  getEnablingToken = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({
      where: {
        [Op.and]: [{ token }, { expiration: { [Op.gte]: Date.now() } }],
      },
    })
    if (!user) {
      req.flash('error', 'Invalid token')
      return res.redirect('/forgot-password')
    }
    res.render('reset-password', {
      title: 'Change password',
      token: user.token,
    })
  }

  postResetPassword = async (req, res) => {
    const { password, password2, token } = req.body
    if (password != password2) {
      req.flash('error', "Passwords doesn't match")
      return res.redirect('back')
    }

    const user = await User.findOne({
      where: {
        [Op.and]: [{ token }, { expiration: { [Op.gte]: Date.now() } }],
      },
    })

    if (!user) {
      req.flash('error', 'Invalid token')
      return res.redirect('/forgot-password')
    }

    user.password = bcrypt.hashSync(password, 10)
    user.token = null
    user.expiration = null
    await user.save()
    req.flash('success', 'Password changed successfully, you can sign in now.')
    res.redirect('/login')
  }

  forceSaveSession = (req, res, next) => {
    req.session.save((err) => {
      if (err) {
        next()
      }
      return res.redirect('/')
    })
  }
}

module.exports = new AuthController()
