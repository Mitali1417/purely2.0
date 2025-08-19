const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, passwordHash });
    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Me error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.guestLogin = async (req, res) => {
  try {
    const guestEmail = process.env.GUEST_EMAIL || "guest@demo.com";
    const guestName = process.env.GUEST_NAME || "Guest User";

    let user = await User.findOne({ email: guestEmail });
    if (!user) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash("guest-password-not-used", salt);
      user = await User.create({ name: guestName, email: guestEmail, passwordHash, role: "user" });
    }

    const token = generateToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Guest login error", err);
    return res.status(500).json({ message: "Server error" });
  }
};


