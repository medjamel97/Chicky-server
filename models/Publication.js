const mongoose = require("mongoose")

const PublicationSchema = new mongoose.Schema(
  {
    idPhoto: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    
    utilisateur : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Utilisateur"
    },

    commentaires : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Commentaire"
    }],

    evaluations : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Evaluation"
    }],
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("Publication", PublicationSchema);
