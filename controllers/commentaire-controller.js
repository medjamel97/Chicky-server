let Commentaire = require("../models/Commentaire")

exports.recupererToutCommentaire = async (req, res) => {
    res.send({ "commentaire" : await Commentaire.find() })
}


exports.recupererCommentaire = async (req, res) => {

    var commentaire
    if (req.body._id) {
        commentaire = await Commentaire.findById(req.body._id)
    } else {
        commentaire = await Commentaire.find()
    }

    res.send({ commentaire })
}

exports.ajouterCommentaire = async (req, res) => {
    const { description, idPublication } = req.body;

    const nouveauCommentaire = new Commentaire()

    nouveauCommentaire.description = description;
    nouveauCommentaire.idPublication = idPublication;
    nouveauCommentaire.save();

    res.status(201).send({ message: "success", commentaire: nouveauCommentaire })
}

exports.modifierCommentaire = async (req, res) => {
    const { _id, description } = req.body

    let commentaire = await Commentaire.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                description: description
            }
        }
    )
    res.status(201).send({ message: "success", commentaire: commentaire })
}

exports.supprimerCommentaire = async (req, res) => {
    const commentaire = await Commentaire.findById(req.body._id).remove()
    res.status(201).send({ message: "success", commentaire: commentaire })
}

exports.supprimerToutCommentaire = async (req, res) => {
    Commentaire.remove({}, function (err, commentaire) {
        if (err) { return handleError(res, err) }
        return res.status(204).send({ message: "Aucun element" })
    })
}
