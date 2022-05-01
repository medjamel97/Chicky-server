const express = require("express")
const router = express.Router()
const PostController = require("../controllers/post-controller")
const upload = require('../middlewares/storage-videos')

router.route("/")
  .get(PostController.getAll)
  .post(upload.single('video'), PostController.add)
  .put(PostController.edit)
  .delete(PostController.delete)

router.route("/my").post(PostController.getMy)
router.delete("/all", PostController.deleteAll)

router.route("/gen").get(PostController.gen)

module.exports = router