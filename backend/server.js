const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error");
const cloudinary = require("cloudinary");
const cors = require("cors");

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.use(errorMiddleware);

const user = require("./routes/userRoutes");

app.use("/api/v1", user);

// Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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
