const Inspection = require("../models/Inspection");
const User = require("../models/User");

exports.getAssignedSchools = async (req, res) => {
  const user = await User.findById(req.userId).populate("assignedSchools");
  res.json(user.assignedSchools);
};

exports.submitInspection = async (req, res) => {
  const newReport = new Inspection({
    inspector: req.userId,
    ...req.body
  });
  await newReport.save();
  res.json({ msg: "Inspection saved" });
};
