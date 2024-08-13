const app = express();
const PORT = process.env.PORT || 5003;

const productListRoutes = require("./routes/productListRoutes");
const { connectDB } = require("./config/db");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://purely2-0.onrender.com",
    methods: ["POST", "GET"],
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
app.use("/api/queries", require("./routes/userQueryRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
