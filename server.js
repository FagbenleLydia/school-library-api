require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

const { protect } = require("./src/middleware/auth");

// Route imports
const authRoutes = require("./src/routes/authRoutes");
const authorRoutes = require("./src/routes/authorRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const attendantRoutes = require("./src/routes/attendantRoutes");

const app = express();

app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes
app.use("/auth", authRoutes);

// Protected routes (require JWT)
app.use("/authors", protect, authorRoutes);
app.use("/books", protect, bookRoutes);
app.use("/students", protect, studentRoutes);
app.use("/attendants", protect, attendantRoutes);

// Quick health check so we know the API is alive
app.get("/", (req, res) => {
  res.json({ message: "School Library Management API" });
});

// Catch-all error handler. It needs to be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
