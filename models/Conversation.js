const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
  {
    dernierMessage : {type: String}, 
    dateDernierMessage : {type: Date}, 
    envoyeur : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur"
    },
    recepteur : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Conversation", ConversationSchema)
