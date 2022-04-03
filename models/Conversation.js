const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
  {
    lastMessage : {type: String}, 
    lastMessageDate : {type: Date}, 
    sender : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    receiver : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Conversation", ConversationSchema)
