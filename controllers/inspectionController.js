const Inspection = require("../models/inspection");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Export this so router can use it
const uploadMiddleware = upload.single("image");

// ✅ The actual controller
const submitInspection = async (req, res) => {
  try {
    const {
      school,
      "ratings[infrastructure]": infrastructure,
      "ratings[cleanliness]": cleanliness,
      "ratings[teacherPresence]": teacherPresence,
      "location[lat]": lat,
      "location[lng]": lng,
    } = req.body;

    const inspection = new Inspection({
      inspector: req.userId,
      school,
      ratings: {
        infrastructure,
        cleanliness,
        teacherPresence,
      },
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      photos: req.file ? [req.file.filename] : [],
    });

    await inspection.save();
    res.status(200).json({ message: "Inspection saved" });
  } catch (err) {
    console.error("❌ Submission error:", err.message);
    res.status(500).json({ error: "Failed to save inspection" });
  }
};

module.exports = {
  getAssignedSchools,
  submitInspection,
  uploadMiddleware,
};
