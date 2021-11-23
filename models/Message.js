const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
module.exports = mongoose.model("Message", MessageSchema);
