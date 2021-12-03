let Publication = require("../models/Publication")

exports.recupererPublication = async (req, res) => {

    var publication;
    if (req.body._id) {
        publication = await Publication.findById(req.body._id)
    } else {
        publication = await Publication.find()
    }

    res.send({ publication })
}

exports.ajouterPublication = async (req, res) => {
    const { idPhoto, description, idUser } = req.body;

    const nouvellePublication = new Publication();

    nouvellePublication.idPhoto = idPhoto;
    nouvellePublication.description = description;
    nouvellePublication.idUser = idUser ; 
   // nouvellePublication.commentaires = [];
    nouvellePublication.save();

    res.status(201).send({ message: "success", publication: nouvellePublication });
}

exports.modifierPublication = async (req, res) => {
    const { _id, idPhoto, description } = req.body;

    let publication = await Publication.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                idPhoto: idPhoto,
                description: description
            }
        }
    );

    res.status(201).send({ message: "success", publication: publication });
};

exports.supprimerPublication = async (req, res) => {
    const publication = await Publication.findById(req.body._id).remove()
    res.status(201).send({ message: "success", publication: publication });
}

exports.supprimerToutPublication = async (req, res) => {
    Publication.remove({}, function (err, publication) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ message: "Aucun element" });
    })
}