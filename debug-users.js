const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find();
    console.log("🧾 All users:");
    users.forEach((u) => {
      console.log(`- ${u.email}`);
    });
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
