const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(limiter);

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;