const express = require("express");
const router = express.Router();
const authorizedUser = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");

// Route for access the logged in user chat
router.post("/", authorizedUser, chatController.accessChat);

// routes for group chat
router.post("/create-group", authorizedUser, chatController.createGroup);
router.put("/rename-group", authorizedUser, chatController.renameGroup);
router.put("/add-to-group", authorizedUser, chatController.addToGroup);
router.put(
  "/remove-from-group",
  authorizedUser,
  chatController.removeFromGroup
);

module.exports = router;
