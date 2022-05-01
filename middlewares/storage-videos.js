
const multer = require("multer")
var path = require('path')

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, './uploads/videos')
  },
  filename: function (_request, file, callback) {
    callback(null, "VIDEO_" + Date.now() + path.extname(file.originalname))
  }
})

module.exports = multer({ storage: storage })