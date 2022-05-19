const express = require("express")
const router = express.Router()
const RecordController = require("../controllers/record-controller")

router.get("/", RecordController.getAll)
router.post("/add-or-update", RecordController.addOrUpdate)
router.post("/get-by-location", RecordController.getByLocation)
router.delete("/all", RecordController.deleteAll)

module.exports = router