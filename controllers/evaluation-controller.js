let Evaluation = require("../models/Evaluation")
const Publication = require("../models/Publication")

exports.recupererEvaluationsParPublication = async (req, res) => {
    console.log(req.body)
    res.send({ evaluations: await Evaluation.find({ publication: req.body.publication }) })
}

exports.recupererEvaluationParUtilisateur = async (req, res) => {
    console.log(req.body)
    res.send({ evaluation: await Evaluation.findOne({ utilisateur: req.body.utilisateur, publication: req.body.publication  }) })
}

exports.ajouterEvaluation = async (req, res) => {
    console.log(req.body)
    const { note, utilisateur, publication } = req.body;

    const newEvaluation = new Evaluation()
    newEvaluation.note = note;
    newEvaluation.utilisateur = utilisateur
    newEvaluation.publication = publication

    await Publication.findOneAndUpdate(
        { _id: utilisateur },
        {
            $push: {
                evaluations: [newEvaluation._id]
            }
        }
    )

    newEvaluation.save();

    res.status(201).send({ message: "success", evaluation: newEvaluation })
}

exports.modifierEvaluation = async (req, res) => {
    const { _id, note } = req.body

    let evaluation = await Evaluation.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                note: note
            }
        }
    )
    res.status(201).send({ message: "success", evaluation: evaluation })
}

exports.supprimerEvaluation = async (req, res) => {
    const evaluation = await Evaluation.findById(req.body._id).remove()
    res.status(201).send({ message: "success", evaluation: evaluation })
}

exports.supprimerToutEvaluation = async (req, res) => {
    Evaluation.remove({}, function (err, evaluation) {
        if (err) { return handleError(res, err) }
        return res.status(204).send({ message: "Aucun element" })
    })
}
