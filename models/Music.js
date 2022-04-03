const mongoose = require("mongoose")

const MusicSchema = new mongoose.Schema(
  {
    title: { type: String },
    artist: { type: String },
    filename: { type: String },
    imageFilename: { type: String },
    likes : [{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Like"
    }],
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Music", MusicSchema)
