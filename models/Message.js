const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: { type: Date, default: Date.now },
    conversationEnvoyeur : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    },
    conversationRecepteur : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    },
    
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Message", MessageSchema)
