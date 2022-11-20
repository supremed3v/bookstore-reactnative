const express = require("express");
const {
  addBooks,
  getBooksByGenre,
  getBooks,
  getSingleBook,
  getBooksByAuthor,
  updateBook,
  searchBook,
  deleteBook,
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
router.route("books?author=authorName").get(getBooksByAuthor);

module.exports = router;
