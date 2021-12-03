const mongoose = require("mongoose")

const CommentaireSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: {
      type: Date,
      default: Date.now
    },
    idPublication: { type: String },
    idUser : {type:String},

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Commentaire", CommentaireSchema)
