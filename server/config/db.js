const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MongoDB connection error: MONGODB_URI is not set");
        return;
    }
    mongoose
        .connect(uri)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = { connectDB };
