const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// API request for the login
router.post("/register", userController.register);

module.exports = router;
