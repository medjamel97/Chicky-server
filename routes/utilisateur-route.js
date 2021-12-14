const express = require("express")
const router = express.Router()
const UtilisateurController = require("../controllers/utilisateur-controller")
const upload = require('../middlewares/storage');

//....................................
/**
 * @swagger
 * components:
 *   schemas:
 *     utilisateur:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - isadmin
 *         - phoneNumber
 *         - FirstName
 *         - LastName
 *         - CIN
 *       properties:
 *       id:
 *           type: string
 *           description: The auto-generated id of the utilisateures
 *       email:
 *           type: string
 *           description: his email
 *         FirstName:
 *           type: string
 *           description: his first name
 *         LastName:
 *           type: string
 *           description: his last name
 *          profilePicture:
 *           type: string
 *           description: his Picture
 *         phoneNumber:
 *           type: number
 *           description: his Number
 *         CIN:
 *           type: number
 *           description: his cin
 *         isadmin:
 *           type: Boolean
 *           description:  role admin ou client
 *
 *
 *       example:
 *         email: jamel@.com 
 *         password: 7894g
 *         phoneNumber: 1234
 *         profilePicture: lien htt
 *         FirstName: jamel
 *         LastName: bd
 *         isadmin: true
 */




 /**
  * @swagger
 

 * /utilisateur:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [usres]
 *     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       500:
 *         description: utilisateur error
 */

router.get("/", UtilisateurController.recupererUtilisateurs)

router.post("/inscription", UtilisateurController.inscription)

router.post("/connexion", UtilisateurController.connexion)

router.post("/connexionAvecReseauSocial", UtilisateurController.connexionAvecReseauSocial)

router.post("/recupererUtilisateurParToken", UtilisateurController.recupererUtilisateurParToken)

router.post("/envoyerConfirmationEmail", UtilisateurController.envoyerConfirmationEmail)

router.get("/confirmation/:token", UtilisateurController.confirmation)

router.post("/motDePasseOublie", UtilisateurController.motDePasseOublie)

router.put("/changerMotDePasse", UtilisateurController.changerMotDePasse)

router.post("/photo-profil", upload.single('image'),UtilisateurController.changerPhotoDeProfil)

router.put("/modifierProfil", UtilisateurController.modifierProfil)

router.delete("/supprimer", UtilisateurController.supprimerUtilisateur)

router.delete("/supprimerTout", UtilisateurController.supprimerToutUtilisateur)

module.exports = router
