var multer = require("multer")
var path = require('path')

var storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, "./uploads/music")
  },
  filename: function (_request, file, callback) {
    callback(null, "MUSIC_" + Date.now() + path.extname(file.originalname))
  }
})

module.exports = multer({ storage: storage })