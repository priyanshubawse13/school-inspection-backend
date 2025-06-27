const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
  inspector: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  date: { type: Date, default: Date.now },
  
  ratings: {
    infrastructure: { type: String, required: true },
    cleanliness: { type: String, required: true },
    teacherPresence: { type: String, required: true }
  },

  description: { type: String },

  photos: [{ type: String }],

  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
});

module.exports = mongoose.model("Inspection", inspectionSchema);
