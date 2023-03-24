require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connectDb");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const { readdirSync } = require("fs");

// CONNECTION TO DATABASE //
const PORT = process.env.PORT || 9000;
connectDB();

// MIDDLEWARES //
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// ROUTES
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// Error handlers
app.use(errorHandler);

// STARTING THE SERVER
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
