const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    videoFilename: { type: String },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }],
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating"
    }],
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

module.exports = mongoose.model("Post", PostSchema)
