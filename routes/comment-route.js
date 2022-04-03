const express = require("express")
const router = express.Router()
const CommentController = require("../controllers/comment-controller")

router.route("/")
    .post(CommentController.addComment)
    .put(CommentController.editComment)
    .delete(CommentController.deleteComment)

router.post("/par-post", CommentController.recupererCommentParPost)

router.delete("/deleteAll", CommentController.deleteAllComment)

module.exports = router