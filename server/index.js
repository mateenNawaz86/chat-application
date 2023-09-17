const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Mateen</h1>");
  console.log("App working");
});

app.listen(port, () => {
  console.log(`Application will be listening on the port ${port}`);
});
