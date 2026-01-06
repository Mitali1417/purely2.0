const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MongoDB connection error: MONGODB_URI is not set");
        return;
    }
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 2,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = { connectDB };
