const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

const productListRoutes = require("./routes/productListRoutes");
const { connectDB } = require("./config/db");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
connectDB();

app.use("/api/products", productListRoutes);
app.use("/api/queries", require("./routes/userQueryRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
