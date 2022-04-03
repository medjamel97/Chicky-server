const express = require("express")
const router = express.Router()
const LikeController = require("../controllers/like-controller")

router.route("/")
    .post(LikeController.addOuSupprimer)

module.exports = router