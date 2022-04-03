const mongoose = require("mongoose")

const RecordSchema = new mongoose.Schema(
  {
    name: { type: String },
    longitude: { type: String },
    lattitude: { type: String },
    date: { type: Date },
    user: { type: mongoose.Types.ObjectId, ref: "User" }
  }
)

module.exports = mongoose.model("Record", RecordSchema)