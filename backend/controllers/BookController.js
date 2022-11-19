const Book = require("../models/bookModel");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Create a new book => /api/v1/book/new

exports.addBooks = catchAsyncErrors(async (req, res, next) => {
  const { name, pdf, description, genre, author, cover, token } = req.body;
  const book = await Book.create({
    name,
    pdf,
    description,
    genre,
    author,
    cover,
    token,
  });
  res.status(201).json({
    success: true,
    book,
  });
});

// Get all books => /api/v1/books

exports.getBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    success: true,
    books,
  });
});

// Get single book details => /api/v1/book/:id

exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

// Update book => /api/v1/book/:id

exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

// Delete book => /api/v1/book/:id

exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});

// Search for books => /api/v1/search?keyword=bookName

exports.searchBook = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({
    name: { $regex: req.query.keyword, $options: "i" },
  });
  if (!books) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    books,
  });
});

// Get books based on genre => /api/v1/books?genre=genreName

exports.getBooksByGenre = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({
    genre: { $regex: req.query.genre, $options: "i" },
  });
  if (!books) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    books,
  });
});

// Get books based on author => /api/v1/books?author=authorName

exports.getBooksByAuthor = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find({
    author: { $regex: req.query.author, $options: "i" },
  });
  if (!books) {
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    books,
  });
});
