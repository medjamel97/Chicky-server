const mongoose = require("mongoose")

const CommentaireSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: {
      type: Date,
      default: Date.now
    },
  
    utilisateurs : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Utilisateur"
    },
    publications : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Publication"
    },

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Commentaire", CommentaireSchema)
