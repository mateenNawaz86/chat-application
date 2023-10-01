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
      type: String,
      required: true,
    },

    profile: {
      type: String,
      default:
        "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongooose.model("User", userModel);
module.exports = User;
