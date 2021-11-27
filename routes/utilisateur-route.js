const express = require("express");
const router = express.Router();
const UtilisateurController = require("../controllers/utilisateur-controller");

router.get("/", UtilisateurController.recupererUtilisateurs);

router.post("/inscription", UtilisateurController.inscription);

router.get("/confirmation/:token", UtilisateurController.confirmation);

router.post("/connexion", UtilisateurController.connexion);

router.post("/reEnvoyerConfirmationEmail", UtilisateurController.reEnvoyerConfirmationEmail);

router.post("/motDePasseOublie", UtilisateurController.motDePasseOublie);

router.put("/changerMotDePasse", UtilisateurController.changerMotDePasse);

router.put("/modifierProfil", UtilisateurController.modifierProfil);

router.post("/modifierProfil/pic/:id", UtilisateurController.modifierPhotoProfil);

router.delete("/supprimer", UtilisateurController.supprimerUtilisateur);

router.delete("/supprimerTout", UtilisateurController.supprimerToutUtilisateur)

module.exports = router;
