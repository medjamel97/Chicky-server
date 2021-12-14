const express = require("express")
const router = express.Router()
const CommentaireController = require("../controllers/commentaire-controller")

router.route("/")
    .post(CommentaireController.ajouterCommentaire)
    .put(CommentaireController.modifierCommentaire)
    .delete(CommentaireController.supprimerCommentaire)

router.post("/par-publication", CommentaireController.recupererCommentaireParPublication)

router.delete("/supprimerTout", CommentaireController.supprimerToutCommentaire)

module.exports = router