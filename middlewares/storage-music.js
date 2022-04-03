var multer = require("multer")
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/music")
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + "-music" + path.extname(file.originalname))
  }
})

module.exports =  multer({ storage: storage })