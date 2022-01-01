const mongoose = require("mongoose");

const MusiqueSchema = new mongoose.Schema(
  {
    titre: { type: String },
    artiste: { type: String },
    emplacementFichier: { type: String },
    emplacementImageAlbum: { type: String },
    jaimes : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Jaime"
    }],
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
module.exports = mongoose.model("Musique", MusiqueSchema);
