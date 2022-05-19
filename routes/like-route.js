const express = require("express")
const router = express.Router()
const LikeController = require("../controllers/like-controller")

router.route("/")
    .get(LikeController.getAll)
    .post(LikeController.addOrRemove)

module.exports = router