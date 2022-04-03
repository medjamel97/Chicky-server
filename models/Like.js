const mongoose = require("mongoose")

const LikeSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    music: { type: mongoose.Schema.Types.ObjectId, ref: "Music" },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Like", LikeSchema)
