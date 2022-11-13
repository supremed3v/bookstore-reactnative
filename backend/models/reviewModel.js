const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "Please enter a rating"],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, "Please enter a comment"],
    maxLength: [1000, "Comment cannot exceed 1000 characters"],
    minLength: [2, "Comment must be at least 2 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
