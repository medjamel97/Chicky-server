const express = require("express")
const router = express.Router()
const PublicationController = require("../controllers/publication-controller")
const upload = require('../middlewares/storage-videos');

/**
* @swagger
* /api/publication:
*   description: The publications managing API
*   get:
*     summary: Returns the list of all the conversations
*     tags: [Publication]
*     responses:
*       200:
*         description: The list publication
*         content:
*           application/json:
*       400:
*         description: publication error
*/
router.route("/")
  .get(PublicationController.recupererToutPublication)
  .put(PublicationController.modifierPublication)
  .delete(PublicationController.supprimerPublication)


router.route("/mes").post(PublicationController.recupererMesPublication)

/**
  * @swagger
 

 * /api/publication:
 *   description: Creer publication
 *   post:
 *     summary: Returns publication
 *     tags: [Publication]
 *     parameters:
 *       - in: body
 *         name: description
 *         type: string
 *     responses:
 *       200:
 *         description: creer publication
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.post("/", upload.single('video'), PublicationController.ajouterPublication)

/**
  * @swagger
 

 * /api/utilisateur/supprimer:
 *   description: The utilisateurs managing API
 *   delete:
 *     summary: Delete all Publications 
 *     tags: [Publication]
 *     responses:
 *       200:
 *         description: Supprimer les publications
 *         content:
 *           application/json:
 *       400:
 *         description: publication error
 */
router.delete("/supprimerTout", PublicationController.supprimerToutPublication)

/**
  * @swagger
 

 * /api/publication:
 *   description: The publication managing API
 *   put:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Publication]
 *     parameters:
 *       - in: body
 *         name: description
 *         type: string
 *     responses:
 *       200:
 *         description: Modifier publication
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

module.exports = router