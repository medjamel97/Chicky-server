const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        username: {type: String, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        birthdate: {type: Date,},
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} is not supported'
            }
        },
        bio: {type: String},
        imageFilename: {type: String},
        role: {
            type: String,
            enum: {
                values: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_OTHER'],
                message: '{VALUE} is not supported'
            }
        },
        isVerified: {type: Boolean}
    },
    {
        timestamps: {currentTime: () => Date.now()},
    }
)
module.exports = mongoose.model("User", UserSchema)
