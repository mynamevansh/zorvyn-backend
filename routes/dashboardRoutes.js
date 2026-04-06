const express = require("express");
const router = express.Router();

const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentTransactions,
} = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 *             example:
 *               totalIncome: 10000
 *               totalExpense: 3500
 *               netBalance: 6500
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: No token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.get("/summary", auth, getSummary);

/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     summary: Category breakdown by type
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of { category, type, total }
 *         content:
 *           application/json:
 *             example:
 *               - category: Food
 *                 type: expense
 *                 total: 1200
 *               - category: Salary
 *                 type: income
 *                 total: 8000
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Invalid token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.get("/categories", auth, getCategoryBreakdown);

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Monthly spending/income trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of { month, total }
 *         content:
 *           application/json:
 *             example:
 *               - month: Jan
 *                 total: 2400
 *               - month: Feb
 *                 total: 1800
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: No token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.get("/trends", auth, getMonthlyTrends);

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Recent transactions (latest 5)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of record documents
 *         content:
 *           application/json:
 *             example:
 *               - amount: 99
 *                 type: expense
 *                 category: Transport
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Invalid token
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.get("/recent", auth, getRecentTransactions);

module.exports = router;