const express = require("express")
const router = express.Router()
const MessageController = require("../controllers/chat-controller")

router.get("/", MessageController.getAllConversations)
router.get("/tout-messages", MessageController.getAllMessages)
router.post("/my-conversations", MessageController.getMyConversations)
router.post("/my-messages", MessageController.getMyMessages)
router.post("/creer-conversation", MessageController.creerNouvelleConversation)
router.post("/envoyer-message", MessageController.envoyerMessage)
router.delete("/", MessageController.deleteConversation)
router.delete("/deleteAll", MessageController.deleteAll)

module.exports = router