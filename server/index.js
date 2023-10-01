const express = require("express");
const connectedToMongoDB = require("./util/database");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config();
connectedToMongoDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Hello Mateen</h1>");
  console.log("App working");
});

// Custom route for the API
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Application will be listening on the port ${port}`);
});
