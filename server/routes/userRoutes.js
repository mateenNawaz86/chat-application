const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateUser, validate } = require("../middleware/validator");

// API request for the register
router.post("/register", validateUser, validate, userController.register);

// API request for the login
router.post("/sign-in", userController.signIn);

module.exports = router;
