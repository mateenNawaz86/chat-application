const express = require("express");
const connectedToMongoDB = require("./util/database");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectedToMongoDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello Mateen</h1>");
  console.log("App working");
});

// Custom route for the API
app.use("/api/user", userRoutes);

// ROUTES for handling the errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application will be listening on the port ${port}`);
});
