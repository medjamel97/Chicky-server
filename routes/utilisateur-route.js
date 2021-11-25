const express = require("express");
const router = express.Router();
const UtilisateurController = require("../controllers/utilisateur-controller");

router.get("/", UtilisateurController.recupererUtilisateurs);

router.post("/inscription", UtilisateurController.inscription);

router.get("/confirmation/:token", UtilisateurController.confirmation);

router.post("/connexion", UtilisateurController.connexion);

router.post("/verifierConfirmationEmail", UtilisateurController.verifierConfirmationEmail);

router.post("/reEnvoyerConfirmationEmail", UtilisateurController.reEnvoyerConfirmationEmail);

router.put("/modifierProfil", UtilisateurController.modifierProfil);

router.post("/modifierProfil/pic/:id", UtilisateurController.modifierPhotoProfil);

router.delete("/supprimer", UtilisateurController.supprimerUtilisateur);

router.delete("/supprimerTout", UtilisateurController.supprimerToutUtilisateur)

module.exports = router;
