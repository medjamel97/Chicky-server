let Message = require("../models/Message")
let Conversation = require("../models/Conversation")

exports.getAllConversations = async (req, res) => {
    res.send({ conversations: await Conversation.find() })
}

exports.getAllMessages = async (req, res) => {
    res.send({ messages: await Message.find() })
}

exports.getMyConversations = async (req, res) => {
    res.send({ conversations: await Conversation.find({ "sender": req.body.sender }).populate("sender receiver") })
}

exports.getMyMessages = async (req, res) => {
    res.send({
        messages: await Message.find(
            {
                $or: [{ 'senderConversation': req.body.conversation }, { 'receiverConversation': req.body.conversation }]
            }
        ).populate("senderConversation receiverConversation")
    })
}

exports.creerNouvelleConversation = async (req, res) => {
    const { sender, receiver } = req.body

    let senderConversation = await Conversation.findOne({ "sender": sender, "receiver": receiver })
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = sender
        senderConversation.receiver = receiver
    }
    senderConversation.lastMessage = "conversation vide"
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    res.status(201).send({ message: "success" })
}

exports.envoyerMessage = async (req, res) => {
    const { description, sender, receiver } = req.body

    let senderConversation = await Conversation.findOne({ "sender": sender, "receiver": receiver })
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = sender
        senderConversation.receiver = receiver
    }
    senderConversation.lastMessage = description
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    let receiverConversation = await Conversation.findOne({ "sender": receiver, "receiver": sender })
    if (!receiverConversation) {
        receiverConversation = new Conversation()
        receiverConversation.sender = receiver
        receiverConversation.receiver = sender
    }
    receiverConversation.lastMessage = description
    receiverConversation.lastMessageDate = Date()
    receiverConversation.save()

    const nouveauMessage = new Message()
    nouveauMessage.description = description
    nouveauMessage.senderConversation = senderConversation._id
    nouveauMessage.receiverConversation = receiverConversation._id
    nouveauMessage.save()

    res.status(201).send({ message: "success", newMessage: nouveauMessage })
}

exports.deleteMessage = async (req, res) => {
    const message = await Message.findById(req.body._id).remove()
    res.status(201).send({ message: "success", message: message })
}

exports.deleteAll = async (req, res) => {
    Conversation.remove({}, function (err, conversation) {
        if (err) { return handleError(res, err) }
    })
    Message.remove({}, function (err, message) {
        if (err) { return handleError(res, err) }
    })

    res.status(204).send({ message: "done" })
}