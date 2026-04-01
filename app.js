const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);

module.exports = app;