const mongoose = require("mongoose")

const EnregistrementSchema = new mongoose.Schema(
  {
    lieu: { type: String },
    date: { type: Date },
    utilisateur: { type: mongoose.Types.ObjectId, ref: "Utilisateur" }
  }
)

module.exports = mongoose.model("Enregistrement", EnregistrementSchema)