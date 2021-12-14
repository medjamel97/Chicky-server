const express = require("express")
const router = express.Router()
const ConversationController = require("../controllers/conversation-controller")
 /**
  * @swagger
 * /api/conversation:
 *   description: The conversations managing API
 *   get:
 *     summary: Returns the list of all the conversations
 *     tags: [Conversation]
*     responses:
 *       200:
 *         description: The list conversations
 *         content:
 *           application/json:
 *       400:
 *         description: conversation error
 */
router.route("/")
    .get(ConversationController.recupererToutConversation)
    .post(ConversationController.ajouterConversation)
    .put(ConversationController.modifierConversation)

router.delete("/supprimerTout", ConversationController.supprimerToutConversation)
router.post("/supp",ConversationController.supprimerConversation)

module.exports = router