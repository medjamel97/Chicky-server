const express = require("express")
const router = express.Router()
const controller = require("../controllers/post-controller")
const multipart = require('connect-multiparty')

router.route("/")
  .get(controller.getAll)
  .post(multipart({}), controller.add)
  .put(controller.edit)
  .delete(controller.delete)

router.route("/by-user/:userId").get(controller.getByUser)

router.delete("/all", controller.deleteAll)
router.route("/gen").get(controller.gen)

module.exports = router