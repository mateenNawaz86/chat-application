const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// controller for the register the user
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, profile } = req.body;

  try {
    // IF any of the field is missing
    if (!name || !email || !password) {
      res.status(401).json({ error: "Please fill up all the input filed!" });
    }

    // check if the user already exit or NOT
    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ error: "User already exit with this email address." });
    }

    // Create a password hash and add salt to the password
    const salt = await bcrypt.genSalt(10);
    const securePsw = await bcrypt.hash(password, salt);

    // Create a new user here
    const user = await User.create({
      name: name,
      email: email,
      password: securePsw,
      profile: profile,
    });

    // Save a newly created user to the database
    if (user) {
      const savedUser = await user.save();
      res
        .status(201)
        .json({ message: "User registered successfully", user: savedUser });
    } else {
      res.status(400).json({ error: "Failed to create the user!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Controller for login the user
exports.signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the entered email from the datase
    const user = await User.findOne({ email });

    // IF user not exist
    if (!user) {
      return res
        .status(400)
        .json({ error: "User NOT exit with this email address!" });
    }

    // Compare the enter password with exist password
    const comparePsw = await bcrypt.compare(password, user.password);

    // Return Error IF entered Password wrong
    if (!comparePsw) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Return JWT_TOKEN to user as a response
    const data = {
      id: user._id,
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);
    if (user) {
      res
        .status(201)
        .json({ message: "User sign in successfully!", token, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Controller for getting all the user
exports.getAllUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        // OR operator work just like arithematic operator
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
        // Regex used for pattern matching string
        // options "i" is used for case-sensitive means works for both
        // upper and lowercase
      }
    : {};

  // here i can return all other use except the logged-in one
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
