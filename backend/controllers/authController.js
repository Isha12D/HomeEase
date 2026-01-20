import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, isProvider } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: isProvider ? "provider" : "customer"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ CHECK ADMIN FIRST
    const admin = await Admin.findOne({ email });

    if (admin) {
      const isMatch = await admin.matchPassword(password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      return res.json({
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        },
        token: generateToken(admin._id, "admin"),
      });
    }

    // 2️⃣ CHECK NORMAL USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

