const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");

// Load env vars

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/userRoutes");

app.use("/api/v1", user);

const PORT = process.env.PORT || 5000;

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
