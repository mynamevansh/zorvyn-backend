const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;