const crypto = require("crypto");
const cloudinary = require("cloudinary");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.url,
    },
  });

  sendToken(user, 201, res);
};
