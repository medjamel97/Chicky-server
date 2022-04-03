const mongoose = require("mongoose")

const RatingSchema = new mongoose.Schema(
    {
        note : {type: Number}, 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
)
module.exports = mongoose.model("Rating", RatingSchema)