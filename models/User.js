const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["inspector", "supervisor"], default: "inspector" },
  assignedSchools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }]
});

module.exports = mongoose.model("User", userSchema);
