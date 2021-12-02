const express = require("express")
const router = express.Router()
const UtilisateurController = require("../controllers/utilisateur-controller")


// Upload image------------------------------------------------------
const multer = require("multer")

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, '/public/images/profile/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
const upload = multer({storage}).any;
//-------------------------------------------------------------------

router.get("/", UtilisateurController.recupererUtilisateurs)

router.post("/inscription", UtilisateurController.inscription)

router.post("/connexion", UtilisateurController.connexion)

router.post("/connexionAvecReseauSocial", UtilisateurController.connexionAvecReseauSocial)

router.get("/recupererUtilisateurParToken", UtilisateurController.recupererUtilisateurParToken)

router.post("/envoyerConfirmationEmail", UtilisateurController.envoyerConfirmationEmail)

router.get("/confirmation/:token", UtilisateurController.confirmation)

router.post("/motDePasseOublie", UtilisateurController.motDePasseOublie)

router.put("/changerMotDePasse", UtilisateurController.changerMotDePasse)

router.put("/modifierProfil", UtilisateurController.modifierProfil)

router.post("/modifierProfil/pic", upload.t("image") , UtilisateurController.modifierPhotoProfil)

router.delete("/supprimer", UtilisateurController.supprimerUtilisateur)

router.delete("/supprimerTout", UtilisateurController.supprimerToutUtilisateur)

module.exports = router
