let Publication = require("../models/Publication")

exports.recupererToutPublication = async (req, res) => {
    res.send({ publication: await Publication.find()})
}

exports.recupererPublication = async (req, res) => {
    res.send({ publication: await Publication.findById(req.body._id) })
}

exports.ajouterPublication = async (req, res) => {
    const { description, utilisateur } = req.body;

    const nouvellePublication = new Publication()

    nouvellePublication.idPhoto = req.file.filename;
    nouvellePublication.description = description;
    // nouvellePublication.utilisateur = utilisateur;
    // nouvellePublication.commentaires = [];
    nouvellePublication.save();

    res.status(201).send({ message: "success", publication: nouvellePublication })
}

exports.modifierPublication = async (req, res) => {
    const { _id, idPhoto, description } = req.body

    let publication = await Publication.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                idPhoto: idPhoto,
                description: description
            }
        }
    )

    res.status(201).send({ message: "success", publication: publication })
}

exports.supprimerPublication = async (req, res) => {
    const publication = await Publication.findById(req.body._id).remove()
    res.status(201).send({ message: "success", publication: publication })
}

exports.supprimerToutPublication = async (req, res) => {
    Publication.remove({}, function (err, publication) {
        if (err) { return handleError(res, err) }
        return res.status(204).send({ message: "Aucun element" })
    })
}