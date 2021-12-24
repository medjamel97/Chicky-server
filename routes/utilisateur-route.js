const express = require("express")
const router = express.Router()
const UtilisateurController = require("../controllers/utilisateur-controller")
const upload = require('../middlewares/storage');

 /**
  * @swagger
 * /api/utilisateur:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

router.get("/", UtilisateurController.recupererUtilisateurs)

 /**
  * @swagger
 * /api/utilisateur/inscription:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: id
 *         type: string
 *       - in: body
 *         name: email
 *         type: string
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.post("/inscription", UtilisateurController.inscription)

/**
  * @swagger
 * /api/utilisateur/connexion:
 *   description: The utilisateurs managing API
 *   post:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *       - in: body
 *         name: password
 *         type: string
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.post("/connexion", UtilisateurController.connexion)

router.post("/connexionAvecReseauSocial", UtilisateurController.connexionAvecReseauSocial)
/**
  * @swagger
 

 * /api/utilisateur/recupererUtilisateurParToken:
 *   description: The utilisateurs managing API
 *   post:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: token
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur par Token
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.post("/recupererUtilisateurParToken", UtilisateurController.recupererUtilisateurParToken)
/**
  * @swagger
 

 * /api/utilisateur/envoyerConfirmationEmail:
 *   description: The utilisateurs managing API
 *   post:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur par Token
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.post("/envoyerConfirmationEmail", UtilisateurController.envoyerConfirmationEmail)
/**
  * @swagger
 

 * /api/utilisateur/confirmation/:token:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: token
 *         type: string
 *     responses:
 *       200:
 *         description: Confirmation Token
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.get("/confirmation/:token", UtilisateurController.confirmation)

router.post("/motDePasseOublie", UtilisateurController.motDePasseOublie)

router.put("/changerMotDePasse", UtilisateurController.changerMotDePasse)

router.post("/photo-profil", upload.single('image'),UtilisateurController.changerPhotoDeProfil)

/**
  * @swagger
 

 * /api/utilisateur/modifierProfil:
 *   description: The utilisateurs managing API
 *   put:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: nom
 *         type: string
 *       - in: body
 *         name: prenom
 *         type: string
 *       - in: body
 *         name: nom
 *         type: string
 *     responses:
 *       200:
 *         description: Modifier profil
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.put("/modifierProfil", UtilisateurController.modifierProfil)
/**
  * @swagger
 

 * /api/utilisateur/supprimer:
 *   description: The utilisateurs managing API
 *   delete:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: _id
 *         type: string
 *     responses:
 *       200:
 *         description: Supprimer utilisateur
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.delete("/supprimer", UtilisateurController.supprimerUtilisateur)

router.delete("/supprimerTout", UtilisateurController.supprimerToutUtilisateur)

module.exports = router
