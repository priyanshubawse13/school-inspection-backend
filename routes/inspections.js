const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getAssignedSchools,
  submitInspection,
  uploadMiddleware
} = require("../controllers/inspectionController");

// ✅ Custom middleware with detailed logging
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("🔐 Incoming Header:", authHeader);

  if (!authHeader) {
    console.log("❌ No token provided");
    return res.status(401).json({ msg: "Token missing" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.log("❌ Token format invalid");
    return res.status(403).json({ msg: "Invalid token format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified for user:", decoded.id);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

// Routes
router.get("/assigned-schools", auth, getAssignedSchools);
router.post("/submit", auth, uploadMiddleware, submitInspection);

module.exports = router;
