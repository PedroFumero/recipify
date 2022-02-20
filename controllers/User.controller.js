const bcrypt = require('bcrypt')
const { User } = require('../models')

class UserController {
  getEditProfile = (req, res) => {
    res.render('edit-profile', { title: 'Edit profile' })
  }

  postEditProfile = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id)

      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.email = req.body.email

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10)
      }
      await user.save()
    } catch (error) {
      req.flash('error', 'Something went wrong')
    }
    res.redirect('back')
  }
}

module.exports = new UserController()
