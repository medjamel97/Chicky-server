const express = require("express")
const router = express.Router()
const CommentaireController = require("../controllers/commentaire-controller")

router.route("/")
    .get(CommentaireController.recupererCommentaire)
    .post(CommentaireController.ajouterCommentaire)
    .put(CommentaireController.modifierCommentaire)
    .delete(CommentaireController.supprimerCommentaire)

router.route("/all")
    .get(CommentaireController.recupererToutCommentaire)

router.delete("/supprimerTout", CommentaireController.supprimerToutCommentaire)

module.exports = router