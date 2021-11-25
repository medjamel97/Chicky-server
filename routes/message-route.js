const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message-controller");

router.route("/")
    .get(MessageController.recupererMessage)
    .post(MessageController.ajouterMessage)
    .put(MessageController.modifierMessage)
    .delete(MessageController.supprimerMessage);

router.delete("/supprimerTout", MessageController.supprimerToutMessage)

module.exports = router;