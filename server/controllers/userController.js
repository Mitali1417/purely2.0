const User = require("../models/userModel");

exports.getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("preferences");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ preferences: user.preferences || {} });
  } catch (err) {
    console.error("Get preferences error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    if (typeof preferences !== "object" || preferences === null) {
      return res.status(400).json({ message: "Invalid preferences payload" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { preferences } },
      { new: true, select: "preferences" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ preferences: user.preferences || {} });
  } catch (err) {
    console.error("Update preferences error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("profile");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ profile: user.profile || {} });
  } catch (err) {
    console.error("Get profile error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    if (typeof profile !== "object" || profile === null) {
      return res.status(400).json({ message: "Invalid profile payload" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profile } },
      { new: true, select: "profile" }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ profile: user.profile || {} });
  } catch (err) {
    console.error("Update profile error", err);
    return res.status(500).json({ message: "Server error" });
  }
};


