const express = require("express")
const router = express.Router()
const PublicationController = require("../controllers/publication-controller")
const upload = require('../middlewares/storage');

router.route("/")
    .get(PublicationController.recupererPublication)

    .put(PublicationController.modifierPublication)
    .delete(PublicationController.supprimerPublication)


router.post("/", upload.single('image'), PublicationController.ajouterPublication)
router.delete("/supprimerTout", PublicationController.supprimerToutPublication)

router.get("/all", PublicationController.recupererToutPublication)

module.exports = router