import "../config.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "Email is required" });
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email: normalizedEmail, phone, password: hashedPassword });
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1d" });
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "Email is required" });
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

export default router;
