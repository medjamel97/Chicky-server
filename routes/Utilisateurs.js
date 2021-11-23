const express = require("express");
const router = express.Router();
const UtilisateurController = require("../controllers/UtilisateurController");

router.get("/", UtilisateurController.recupererUtilisateurs);

router.post("/inscription", UtilisateurController.inscription);

router.post("/connexion", UtilisateurController.connexion);

router.get("/confirmation/:token", UtilisateurController.confirmation);

router.put("/modifierProfil", UtilisateurController.modifierProfil);

router.put("/modifierProfil/pic/:id", UtilisateurController.modifierPhotoProfil);

module.exports = router;
