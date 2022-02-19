class UserController {
  editProfile = (req, res) => {
    res.render('edit-profile', { title: 'Edit profile' })
  }
}

module.exports = new UserController()
