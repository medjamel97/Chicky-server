const express = require("express")
const router = express.Router()
const ConversationController = require("../controllers/conversation-controller")

router.route("/")
    .get(ConversationController.recupererToutConversation)
    .post(ConversationController.ajouterConversation)
    .put(ConversationController.modifierConversation)

router.delete("/supprimerTout", ConversationController.supprimerToutConversation)
router.post("/supp",ConversationController.supprimerConversation)

module.exports = router