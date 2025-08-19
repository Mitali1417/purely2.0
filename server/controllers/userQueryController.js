const UserData = require("../models/userQueryModel");

exports.submitQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newQuery = new UserData({ name, email, message });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    console.error("Error saving query: ", error);
    res.status(400).json({ message: "Error submitting query", error: error.message });
  }
};
