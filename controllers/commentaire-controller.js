let Commentaire = require("../models/Commentaire")
const Publication = require("../models/Publication")
const Utilisateur = require("../models/Utilisateur")

exports.recupererCommentaireParPublication = async (req, res) => {
    res.send({ commentaire: await Commentaire.find({ publication: req.body.publication }).populate("utilisateur publication") })
}

exports.recupererCommentaire = async (req, res) => {
    res.send({ commentaire: await Commentaire.findById(req.body._id) })
}

exports.ajouterCommentaire = async (req, res) => {
    console.log(req.body)
    const { description, utilisateur, publication } = req.body;

    const nouveauCommentaire = new Commentaire()
    nouveauCommentaire.description = description;
    nouveauCommentaire.utilisateur = utilisateur
    nouveauCommentaire.publication = publication

    await Publication.findOneAndUpdate(
        { _id: publication },
        {
            $push: {
                commentaires: [nouveauCommentaire._id]
            }
        }
    )

    await Utilisateur.findOneAndUpdate(
        { _id: utilisateur },
        {
            $push: {
                commentaires: [nouveauCommentaire._id]
            }
        }
    )

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
