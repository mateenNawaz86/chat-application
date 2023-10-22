const Chat = require("../models/chatModel");
const asyncHandler = require("express-async-handler");

exports.accessChat = asyncHandler(async (req, res) => {
  const { useId } = req.body;

  // IF the use ID not found
  if (!userId) {
    console.log("User id is NOT with the params");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      // it's works when both of the condition is true
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMsg");
});
