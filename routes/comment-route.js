const express = require("express")
const router = express.Router()
const CommentController = require("../controllers/comment-controller")

router.route("/")
    .get(CommentController.getAll)
    .post(CommentController.add)
    .delete(CommentController.deleteAllComment)

module.exports = router