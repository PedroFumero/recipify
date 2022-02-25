const { validationResult } = require('express-validator')

const extractErrors = (req, res, next) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    errors = errors.errors.map((error) => error.msg)
    // console.log(errors)
    req.flash('error', errors)
    return res.redirect('back')
  }
  next()
}

module.exports = extractErrors
