let Message = require("../models/Message")
let Conversation = require("../models/Conversation")

exports.recupererToutConversations = async (req, res) => {
    res.send({ conversations: await Conversation.find() })
}

exports.recupererToutMessages = async (req, res) => {
    res.send({ messages: await Message.find() })
}

exports.recupererMesConversations = async (req, res) => {
    res.send({ conversations: await Conversation.find({ "envoyeur": req.body.envoyeur }).populate("envoyeur recepteur") })
}

exports.recupererMesMessages = async (req, res) => {
    res.send({
        messages: await Message.find(
            {
                $or: [{ 'conversationEnvoyeur': req.body.conversation }, { 'conversationRecepteur': req.body.conversation }]
            }
        ).populate("conversationEnvoyeur conversationRecepteur")
    })
}

exports.creerNouvelleConversation = async (req, res) => {
    const { envoyeur, recepteur } = req.body

    let conversationEnvoyeur = await Conversation.findOne({ "envoyeur": envoyeur, "recepteur": recepteur })
    if (!conversationEnvoyeur) {
        conversationEnvoyeur = new Conversation()
        conversationEnvoyeur.envoyeur = envoyeur
        conversationEnvoyeur.recepteur = recepteur
    }
    conversationEnvoyeur.dernierMessage = "conversation vide"
    conversationEnvoyeur.dateDernierMessage = Date()
    conversationEnvoyeur.save()

    res.status(201).send({ message: "success" })
}

exports.envoyerMessage = async (req, res) => {
    const { description, envoyeur, recepteur } = req.body

    let conversationEnvoyeur = await Conversation.findOne({ "envoyeur": envoyeur, "recepteur": recepteur })
    if (!conversationEnvoyeur) {
        conversationEnvoyeur = new Conversation()
        conversationEnvoyeur.envoyeur = envoyeur
        conversationEnvoyeur.recepteur = recepteur
    }
    conversationEnvoyeur.dernierMessage = description
    conversationEnvoyeur.dateDernierMessage = Date()
    conversationEnvoyeur.save()

    let conversationRecepteur = await Conversation.findOne({ "envoyeur": recepteur, "recepteur": envoyeur })
    if (!conversationRecepteur) {
        conversationRecepteur = new Conversation()
        conversationRecepteur.envoyeur = recepteur
        conversationRecepteur.recepteur = envoyeur
    }
    conversationRecepteur.dernierMessage = description
    conversationRecepteur.dateDernierMessage = Date()
    conversationRecepteur.save()

    const nouveauMessage = new Message()
    nouveauMessage.description = description
    nouveauMessage.conversationEnvoyeur = conversationEnvoyeur._id
    nouveauMessage.conversationRecepteur = conversationRecepteur._id
    nouveauMessage.save()

    res.status(201).send({ message: "success", newMessage: nouveauMessage })
}

exports.supprimerMessage = async (req, res) => {
    const message = await Message.findById(req.body._id).remove()
    res.status(201).send({ message: "success", message: message })
}

exports.supprimerTout = async (req, res) => {
    Conversation.remove({}, function (err, conversation) {
        if (err) { return handleError(res, err) }
    })
    Message.remove({}, function (err, message) {
        if (err) { return handleError(res, err) }
    })

    res.status(204).send({ message: "done" })
}