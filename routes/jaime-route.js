const express = require("express")
const router = express.Router()
const JaimeController = require("../controllers/jaime-controller")

router.route("/")
    .post(JaimeController.ajouterOuSupprimer)

module.exports = router