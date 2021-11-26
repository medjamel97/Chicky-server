let Conversation = require("../models/Conversation")

exports.recupererConversation = async (req, res) => {

    var conversation;
    if (req.body._id) {
        conversation = await Conversation.findById(req.body._id)
    } else {
        conversation = await Conversation.find()
    }

    res.send({ conversation })
}

exports.ajouterConversation = async (req, res) => {
    const { description } = req.body;

    const nouvelleConversation = new Conversation();

    nouvelleConversation.description = description;
    nouvelleConversation.save();

    res.status(201).send({ message: "success", conversation: nouvelleConversation });
}

exports.modifierConversation = async (req, res) => {
    const { _id, idPhoto, description } = req.body;

    let conversation = await Conversation.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                idPhoto: idPhoto,
                description: description
            }
        }
    );

    res.status(201).send({ message: "success", conversation: conversation });
};

exports.supprimerConversation = async (req, res) => {
    const conversation = await Conversation.findById(req.body._id).remove()
    res.status(201).send({ message: "success", conversation: conversation });
}

exports.supprimerToutConversation = async (req, res) => {
    Conversation.remove({}, function (err, conversation) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ message: "Aucun element" });
    })
}