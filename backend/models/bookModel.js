const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    maxLength: [100, "Title cannot exceed 100 characters"],
    minLength: [2, "Title must be at least 2 characters"],
  },
  pdf: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  genre: {
    type: String,
    required: [true, "Please enter a genre"],
    maxLength: [100, "Genre cannot exceed 100 characters"],
    minLength: [2, "Genre must be at least 2 characters"],
  },
  author: {
    type: String,
    required: [true, "Please enter an author"],
    maxLength: [100, "Author cannot exceed 100 characters"],
    minLength: [2, "Author must be at least 2 characters"],
  },
  cover: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
    maxLength: [1000, "Description cannot exceed 1000 characters"],
    minLength: [2, "Description must be at least 2 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
