const mongoose = require("mongoose")

const EvaluationSchema = new mongoose.Schema(
    {
        note : {type: Number}, 

        utilisateur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Utilisateur"
        },
        publication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Publication"
        },

    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
)
module.exports = mongoose.model("Evaluation", EvaluationSchema)