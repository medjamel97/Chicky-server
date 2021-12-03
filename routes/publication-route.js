const express = require("express")
const router = express.Router()
const PublicationController = require("../controllers/publication-controller")

router.route("/")
    .get(PublicationController.recupererPublication)
    .post(PublicationController.ajouterPublication)
    .put(PublicationController.modifierPublication)
    .delete(PublicationController.supprimerPublication)

    router.delete("/supprimerTout", PublicationController.supprimerToutPublication)

    router.get("/all", PublicationController.recupererToutPublication)

module.exports = router