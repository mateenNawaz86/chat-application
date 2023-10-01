const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, profile } = req.body;

  try {
    // IF any of the field is missing
    if (!name || !email || !password) {
      res.status(400).json({ error: "Please fill up all the input filed!" });
    }

    // check if the user already exit or NOT
    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ error: "User already exit with this email address." });
    }

    // Create a new user here
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      profile: profile,
    });

    // Save a newly created user to database
    if (user) {
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ error: "Failed to create the user!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
