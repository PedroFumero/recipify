const path = require('path')
const multer = require('multer')

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads', 'thumbnails'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  },
})

const fileFilterConfig = (req, file, cb) => {
  if (
    file.mimetype.split('/')[1] === 'jpeg' ||
    file.mimetype.split('/')[1] === 'png'
  ) {
    // console.log(file)
    cb(null, true)
  }
  cb(null, false)
}

module.exports = { storageConfig, fileFilterConfig }
