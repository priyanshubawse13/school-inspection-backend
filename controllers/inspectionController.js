const Inspection = require("../models/inspection");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const User = require("../models/User");

const getAssignedSchools = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("assignedSchools");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user.assignedSchools);
  } catch (err) {
    console.error("❌ Error fetching assigned schools:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  limits: { fieldSize: 10 * 1024 * 1024 }, // 10MB for fields
});


// ✅ Export this so router can use it
const uploadMiddleware = upload.single("image");



// ✅ The actual controller
const submitInspection = async (req, res) => {
  console.log("📥 req.body:", req.body);
  console.log("📸 req.file:", req.file);

  try {
    const {
      school,
      ratings,
      location
    } = req.body;
    
    if (!school || !ratings || !location) {
      console.log("❌ Missing main objects:", { school, ratings, location });
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const { infrastructure, cleanliness, teacherPresence } = ratings;
    const { lat, lng } = location;
    
    if (!infrastructure || !cleanliness || !teacherPresence || !lat || !lng) {
      console.log("❌ Missing subfields:", { infrastructure, cleanliness, teacherPresence, lat, lng });
      return res.status(400).json({ error: "Missing rating or location details" });
    }
    

    if (!school || !infrastructure || !cleanliness || !teacherPresence || !lat || !lng) {
      console.log("❌ Missing fields:", {
        school, infrastructure, cleanliness, teacherPresence, lat, lng
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

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
