import Admin from "../models/Admin.js";
import Service from "../models/Service.js";
import jwt from "jsonwebtoken";

// Admin login 
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET || "supersecret",
        { expiresIn: "1d" }
      );

      res.json({ admin: { id: admin._id, name: admin.name, email: admin.email }, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add service
export const addService = async (req, res) => {
  const { name, img, description, price } = req.body;
  try {
    const service = new Service({ name, img, description, price });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
