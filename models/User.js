const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    birthdate: { type: Date, },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not supported'
      }
    },
    bio: { type: String },
    imageFilename: { type: String },
    role: {
      type: String,
      enum: {
        values: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_OTHER'],
        message: '{VALUE} is not supported'
      }
    },
    isVerified: { type: Boolean }
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("User", UserSchema)
