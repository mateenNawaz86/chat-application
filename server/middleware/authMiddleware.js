const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

// here i write the code for handling the authentication of the user
exports.authorizedUser = asyncHandler(async (req, res, next) => {
  let token;

  // here we check that token included "Bearer" keyword
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // here we get the token without Bearer keyword
      token = req.headers.authorization.split(" ")[1];

      // decode the user id from token
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      //   find the use with decoded ID and return user except the password
      req.user = await User.findById(decodeToken.id).select("-password");
      next();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  //   if the user token not included "Bearer"
  if (!token) {
    res.status(401).json({ error: "User NOT authorized" });
  }
});
