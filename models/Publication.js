const mongoose = require("mongoose")

const PublicationSchema = new mongoose.Schema(
  {
    idPhoto: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    commentaires : {type: Array}, 
    idUser: { type: String },
    
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("Publication", PublicationSchema);
