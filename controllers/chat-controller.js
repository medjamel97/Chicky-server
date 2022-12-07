let Message = require("../models/Message")
let Conversation = require("../models/Conversation")

exports.getAllConversations = async (req, res) => {
    res.send({conversations: await Conversation.find()})
}

exports.getAllMessages = async (req, res) => {
    res.send({messages: await Message.find()})
}

exports.getMyConversations = async (req, res) => {
    res.send({conversations: await Conversation.find({"sender": req.params.senderId}).populate("sender receiver")})
}

exports.getMyMessages = async (req, res) => {
    res.send({
        messages: await Message.find(
            {
                $or: [
                    {'senderConversation': req.params.conversationId},
                    {'receiverConversation': req.params.conversationId},
                ]
            }
        ).populate("senderConversation receiverConversation")
    })
}

exports.createConversation = async (req, res) => {
    const {sender, receiver} = req.body

    let senderConversation = await Conversation.findOne({"sender": sender, "receiver": receiver})
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = sender
        senderConversation.receiver = receiver
    }
    senderConversation.lastMessage = "New conversation"
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    res.status(200).send({message: "success"})
}

exports.sendMessage = async (req, res) => {
    const {description, senderId, receiverId} = req.body

    let senderConversation = await Conversation.findOne({"sender": senderId, "receiver": receiverId})
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = senderId
        senderConversation.receiver = receiverId
    }
    senderConversation.lastMessage = description
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    let receiverConversation = await Conversation.findOne({"sender": receiverId, "receiver": senderId})
    if (!receiverConversation) {
        receiverConversation = new Conversation()
        receiverConversation.sender = receiverId
        receiverConversation.receiver = senderId
    }
    receiverConversation.lastMessage = description
    receiverConversation.lastMessageDate = Date()
    receiverConversation.save()

    const newMessage = new Message()
    newMessage.description = description
    newMessage.senderConversation = senderConversation._id
    newMessage.receiverConversation = receiverConversation._id
    await newMessage.save()

    res.status(200).send({message: "success", newMessage: newMessage})
}

exports.deleteMessage = async (req, res) => {
    await Message.findById(req.body._id).remove();
    res.status(200).send({message: "success"})
}

exports.deleteConversation = async (req, res) => {
    const conversation = await Conversation.findById(req.body._id).remove()
    res.status(200).send({message: "success", conversation})
}

exports.deleteAll = async (req, res) => {
    Conversation.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
    })
    Message.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
    })

    res.status(204).send({message: "done"})
}