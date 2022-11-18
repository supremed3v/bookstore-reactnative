const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/users").post(getAllUsers);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;
