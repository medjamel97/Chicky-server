const express = require("express")
const router = express.Router()
const RecordController = require("../controllers/record-controller")

router.get("/", RecordController.getAll)
router.post("/add", RecordController.addOuMettreAjour)
router.post("/par-lieu", RecordController.recupererParLieu)

module.exports = router