
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, './uploads/images')
  },
  filename: function (_request, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})

module.exports = multer({ storage: storage })