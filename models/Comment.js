const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: {
      type: Date,
      default: Date.now
    },
    user : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "User"
    },
    post : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Post"
    },

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Comment", CommentSchema)
