const mongooose = require("mongoose");
const { Schema } = mongooose;

// schema for the chat Model
const chatModel = new Schema(
  {
    chatName: {
      type: String,
      required: true,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: mongooose.Schema.Types.ObjectId, // it takes the id of the user from User
        ref: "User",
      },
    ],

    latestMsg: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  // mongoose create a new timestamps everytime when new data is stored
  {
    timestamps: true,
  }
);

const Chat = mongooose.model("Chat", chatModel);

module.exports = Chat;
