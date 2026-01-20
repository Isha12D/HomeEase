import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const exists = await Admin.findOne({ email: "admin@homeease.com" });

    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    await Admin.create({
      name: "Super Admin",
      email: "admin@homeease.com",
      password: "admin123",
    });

    console.log("✅ Admin seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedAdmin();
