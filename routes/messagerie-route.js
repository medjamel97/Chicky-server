const express = require("express")
const router = express.Router()
const MessageController = require("../controllers/messagerie-controller")

router.get("/", MessageController.recupererToutConversations)
router.get("/tout-messages", MessageController.recupererToutMessages)
router.post("/mes-conversations", MessageController.recupererMesConversations)
router.post("/mes-messages", MessageController.recupererMesMessages)
router.post("/creer-conversation", MessageController.creerNouvelleConversation)
router.post("/envoyer-message", MessageController.envoyerMessage)
router.delete("/supprimerTout", MessageController.supprimerTout)

module.exports = router