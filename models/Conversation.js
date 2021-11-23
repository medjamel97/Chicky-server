const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
