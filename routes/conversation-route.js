const express = require("express")
const router = express.Router()
const ConversationController = require("../controllers/conversation-controller")

router.route("/")
    .get(ConversationController.recupererConversation)
    .post(ConversationController.ajouterConversation)
    .put(ConversationController.modifierConversation)
    .delete(ConversationController.supprimerConversation)

router.delete("/supprimerTout", ConversationController.supprimerToutConversation)

module.exports = router