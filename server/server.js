const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

const productListRoutes = require("./routes/productListRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/db");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://purely2-0.onrender.com", "http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Enable preflight for all routes
app.options("*", cors({
  origin: ["https://purely2-0.onrender.com", "http://localhost:5174", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Connect to database
connectDB();

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// API routes
app.use("/api/products", productListRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/queries", require("./routes/userQueryRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
