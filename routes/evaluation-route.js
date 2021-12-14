const express = require("express")
const router = express.Router()
const EvaluationController = require("../controllers/evaluation-controller")

router.route("/")
    .post(EvaluationController.ajouterEvaluation)
    .put(EvaluationController.modifierEvaluation)

router.post("/par-utilisateur-publication", EvaluationController.recupererEvaluationParUtilisateur)
router.post("/par-publication", EvaluationController.recupererEvaluationsParPublication)

router.delete("/supprimerTout", EvaluationController.supprimerToutEvaluation)
router.post("/supp", EvaluationController.supprimerEvaluation)

module.exports = router