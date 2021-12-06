const mongoose = require("mongoose")

const UtilisateurSchema = new mongoose.Schema(
  {
    pseudo: { type: String },
    email: { type: String },
    mdp: { type: String },
    nom: { type: String },
    prenom: { type: String },
    dateNaissance: { type: Date, },
    idPhoto: { type: String },
    sexe: { type: Boolean },
    score: { type: Number },
    bio: { type: String },
    isVerified: { type: Boolean },
    // Relations
    /*publication: {
      type: mongoose.Types.ObjectId
      ref: "Publication"
    }*/

    publications : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Publication"
    }],
    conversations : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    }],
    commentaires : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Commentaire"
    }],
    jaimes : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Jaime"
    }],

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Utilisateur", UtilisateurSchema)
