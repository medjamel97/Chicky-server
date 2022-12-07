const express = require("express")
const router = express.Router()
const controller = require("../controllers/chat-controller")

router.get("/", controller.getAllConversations)
router.get("/tout-messages", controller.getAllMessages)
router.get("/my-conversations/:senderId", controller.getMyConversations)
router.get("/my-messages/:conversationId", controller.getMyMessages)
router.post("/create-conversation", controller.createConversation)
router.post("/send-message", controller.sendMessage)
router.delete("/", controller.deleteConversation)
router.delete("/deleteAll", controller.deleteAll)

module.exports = router