const express = require("express")
const router = express.Router()
const controller = require("../controllers/music-controller")
const multipart = require('connect-multiparty')

router
    .route("/")
    .get(controller.getAll)
    .post(multipart({}), controller.add)
    .delete(controller.delete)

router.post("/one", controller.recupererParId)

router.delete("/all", controller.deleteAll)

module.exports = router
