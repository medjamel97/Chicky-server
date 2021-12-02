let Message = require("../models/Message")

exports.recupererMessage = async (req, res) => {

    var message
    if (req.body._id) {
        message = await Message.findById(req.body._id)
    } else {
        message = await Message.find()
    }

    res.send({ message })
}

exports.ajouterMessage = async (req, res) => {
    const { description } = req.body

    const nouvelleMessage = new Message()

    nouvelleMessage.description = description
    nouvelleMessage.save()

    res.status(201).send({ message: "success", message: nouvelleMessage })
}

exports.modifierMessage = async (req, res) => {
    const { _id, description } = req.body

    let message = await Message.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                description: description
            }
        }
    )

    res.status(201).send({ message: "success", message: message })
}

exports.supprimerMessage = async (req, res) => {
    const message = await Message.findById(req.body._id).remove()
    res.status(201).send({ message: "success", message: message })
}

exports.supprimerToutMessage = async (req, res) => {
    Message.remove({}, function (err, message) {
        if (err) { return handleError(res, err) }
        return res.status(204).send({ message: "Aucun element" })
    })
}