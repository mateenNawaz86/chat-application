const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// API request for the register
router.post("/register", userController.register);

// API request for the login
router.get("/sign-in", userController.signIn);

module.exports = router;
