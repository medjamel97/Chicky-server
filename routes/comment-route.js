const express = require("express")
const router = express.Router()
const controller = require("../controllers/comment-controller")

router.route("/")
    .get(controller.getAll)
    .post(controller.add)
    .delete(controller.deleteAllComment)

module.exports = router