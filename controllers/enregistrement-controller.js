const Enregistrement = require("../models/Enregistrement");

exports.recupererTout = async (req, res) => {
    res.status(201).send({ "enregistrements": await Enregistrement.find() });
};

exports.recupererParLieu = async (req, res) => {
    console.log("le lieu : " + req.body.lieu)
    res.status(201).send({ "enregistrements": await Enregistrement.find({ lieu: req.body.lieu }).populate("utilisateur") });
};

exports.ajouterOuMettreAjour = async (req, res) => {
    const { idUtilisateur, lieu } = req.body;

    let enregistrement = await Enregistrement.findOne({
        utilisateur: idUtilisateur,
        lieu: lieu,
    });

    if (enregistrement) {
        await Enregistrement.findOneAndUpdate(
            {
                utilisateur: idUtilisateur,
                lieu: lieu,
            },
            {
                $set: {
                    date: Date.now()
                }
            }
        )

        res.status(201).send({ message: "updated" });
    } else {
        enregistrement = new Enregistrement();
        enregistrement.date = Date.now();
        enregistrement.utilisateur = idUtilisateur;
        enregistrement.lieu = lieu;

        enregistrement.save();

        res.status(201).send({ message: "added" });
    }
};
