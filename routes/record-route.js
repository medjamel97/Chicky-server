const express = require("express")
const router = express.Router()
const controller = require("../controllers/record-controller")

router.get("/", controller.getAll)
router.post("/add-or-update", controller.addOrUpdate)
router.post("/get-by-location", controller.getByLocation)
router.delete("/all", controller.deleteAll)

module.exports = router