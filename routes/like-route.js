const express = require("express")
const router = express.Router()
const controller = require("../controllers/like-controller")

router.route("/")
    .get(controller.getAll)
    .post(controller.addOrRemove)

module.exports = router