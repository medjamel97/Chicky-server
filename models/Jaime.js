const mongoose = require("mongoose");

const JaimeSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
    musique: { type: mongoose.Schema.Types.ObjectId, ref: "Musique" },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
module.exports = mongoose.model("Jaime", JaimeSchema);
