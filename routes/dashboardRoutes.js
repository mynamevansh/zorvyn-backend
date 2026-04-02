const express = require("express");
const router = express.Router();

const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentTransactions,
} = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");

router.get("/summary", auth, getSummary);
router.get("/categories", auth, getCategoryBreakdown);
router.get("/trends", auth, getMonthlyTrends);
router.get("/recent", auth, getRecentTransactions);

module.exports = router;