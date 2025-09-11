const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env BEFORE importing anything that depends on it
dotenv.config();

const checkoutRoutes = require("./routes/checkoutRoutes");
const { handleStripeWebhook } = require("./controllers/checkoutController");

const app = express();
const PORT = process.env.PORT || 5003;

const productListRoutes = require("./routes/productListRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const { connectDB } = require("./config/db");

// Stripe webhook must use raw body. Define before express.json.
// app.post(
//   "/api/checkout/webhook",
//   express.raw({ type: "application/json" }),
//   (req, res, next) => {
//     req.rawBody = req.body;
//     return handleStripeWebhook(req, res, next);
//   }
// );
// BEFORE app.use(express.json())
app.post(
  "/api/checkout/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// THEN your normal body parser
app.use(express.json());

// Middleware
app.use(express.json());
app.use(
  cors({
    // origin: [
    //   "https://purely2-0.onrender.com",
    //   "http://localhost:5174",
    //   "http://localhost:5173",
    // ],
    origin  : "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Enable preflight for all routes
app.options(
  "*",
  cors({
    origin: [
      "https://purely2-0.onrender.com",
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect to database
connectDB();

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// API routes
app.use("/api/products", productListRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/queries", require("./routes/userQueryRoutes"));
app.use("/api/checkout", checkoutRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
