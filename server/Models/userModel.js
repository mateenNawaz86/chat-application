const mongooose = require("mongoose");
const { Schema } = mongooose;

const userModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: Number,
      required: true,
    },
    profile: {
      type: String,
      required: true,   
    },
  },
  {
    timestamps: true,
  }
);

const User = mongooose.model("User", userModel);
module.exports = User;
