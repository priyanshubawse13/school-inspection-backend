const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
  inspector: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  date: { type: Date, default: Date.now },
  ratings: Object,
  description: String,
  photos: [String],
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Inspection", inspectionSchema);
