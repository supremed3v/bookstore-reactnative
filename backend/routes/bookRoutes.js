const express = require("express");
const { remove } = require("lodash");
const {
  addBooks,
  getBooksByGenre,
  getBooks,
  getSingleBook,
  getBooksByAuthor,
  updateBook,
  searchBook,
  deleteBook,
  addToFavourites,
  removeFromFavourites,
} = require("../controllers/BookController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addBooks);
router.route("/get-books").get(getBooks);
router.route("/:id").get(getSingleBook);
router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook);
router.route("/search?keyword=bookName").get(searchBook);
router.route("/search?keyword=genre").get(getBooksByGenre);
router.route("/books?author=authorName").get(getBooksByAuthor);
router.route("/addFavorite").post(isAuthenticatedUser, addToFavourites);
router.route("/removeFavorite").post(isAuthenticatedUser, removeFromFavourites);

module.exports = router;
