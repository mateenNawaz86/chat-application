const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const { Schema } = mongooose;

// Here is the model for the messages
const messageModel = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    chat: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongooose.model("Message", messageModel);
module.exports = Message;
