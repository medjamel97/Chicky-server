
const multer = require("multer")
var path = require('path')

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, './uploads/images')
  },
  filename: function (_request, file, callback) {
    callback(null, "IMAGE_" + Date.now() + path.extname(file.originalname))
  }
})

module.exports = multer({ storage: storage })