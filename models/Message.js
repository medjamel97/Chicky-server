const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: { type: Date, default: Date.now },
    conversation : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    }],
    
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Message", MessageSchema)
