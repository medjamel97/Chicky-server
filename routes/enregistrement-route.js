const express = require("express")
const router = express.Router()
const EnregistrementController = require("../controllers/enregistrement-controller")

router.get("/", EnregistrementController.recupererTout)
router.post("/ajouter", EnregistrementController.ajouterOuMettreAjour)
router.post("/par-lieu", EnregistrementController.recupererParLieu)

module.exports = router