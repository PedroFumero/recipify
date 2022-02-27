class GeneralController {
  getAboutPage = (req, res) => {
    res.render('about.pug', { title: 'About Recipify' })
  }
}

module.exports = new GeneralController()
