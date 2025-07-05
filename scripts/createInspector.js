// scripts/createInspector.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const School = require("../models/School");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");

    const schools = await School.find();
    const hashed = await bcrypt.hash("test123", 10);

    if (!schools.length) {
        console.log("❌ No schools found. Please insert schools first.");
        process.exit(1);
      }  

    const user = new User({
      name: "Inspector Raj",
      email: "raj@example.com",
      password: hashed,
      role: "inspector",
      assignedSchools: [schools[0]._id], // Assign 1st school
    });

    await user.save();
    console.log("✅ Inspector created:", user);
    process.exit();
  } catch (e) {
    console.error("❌", e);
    process.exit(1);
  }
  
})();
 //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWY5MTg4YTUxODQ0YjcwNzA0ZjE1ZCIsImlhdCI6MTc1MTA5NDAzNCwiZXhwIjoxNzUxMTgwNDM0fQ.4Nyct56oK3ITgi65NJkLonpB09IK2l5XXgxZRAMartQ  
 //685f8f0e8954da6a18e3e924