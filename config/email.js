const path = require('path')
const nodemailer = require('nodemailer')

require('dotenv').config({ path: path.join(__dirname, '..', 'variables.env') })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

module.exports = transporter
