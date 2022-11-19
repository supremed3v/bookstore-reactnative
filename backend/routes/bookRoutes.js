const express = require("express");
const { addBooks, getBooksByGenre } = require("../controllers/BookController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addBooks);
router.route("/books").get(getAllBooks);
router.route("/book/:id").get(getSingleBook);
router
  .route("/book/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook);
router.route("/search?keyword=bookName").get(searchBook);
router.route("/search?keyword=genre").get(getBooksByGenre);
router.route("books?author=authorName").get(getBooksByAuthor);

module.exports = router;
