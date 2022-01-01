var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/musique");
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

module.exports =  multer({ storage: storage });;