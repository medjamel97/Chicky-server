const mongoose = require("mongoose")

const JaimeSchema = new mongoose.Schema(
  {
    
    date: {
      type: Date,
      default: Date.now
    },
    utilisateurs : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: "Utilisateur"
      },
      publications : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref: "Publication"
      }],
    
                                                       
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Jaime", JaimeSchema)