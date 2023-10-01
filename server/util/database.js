const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.MONGO_URI;

// function for connecting to MongoDB
const connectedToMongoDB = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log(`Connected to MONGODB successfully!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectedToMongoDB;
