const express = require("express");
const router = express.Router();

const { 
  getSummary, 
  getCategoryBreakdown, 
  getMonthlyTrends 
} = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");

router.get("/summary", auth, getSummary);
router.get("/categories", auth, getCategoryBreakdown);
router.get("/trends", auth, getMonthlyTrends);

module.exports = router;