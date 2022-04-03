
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads/videos')
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})

module.exports =  multer({ storage: storage })