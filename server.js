const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const inspectionRoutes = require("./routes/inspections"); // ✅ Added

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-data support

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/inspection", inspectionRoutes); // ✅ Mount inspection routes

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ API root working");
});

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 5050;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection failed:", err.message));
