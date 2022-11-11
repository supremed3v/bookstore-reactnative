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

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
