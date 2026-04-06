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
 *     description: |
 *       🔐 **Requires Authentication**
 *
 *       ⚡ Check **Server Response** above for actual aggregated values.
 *
 *       ----------------------------------------
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
 *     description: |
 *       🔐 **Requires Authentication**
 *
 *       ⚡ Check **Server Response** above for real category totals.
 *
 *       ----------------------------------------
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
 *     summary: Monthly income vs expense
 *     description: |
 *       🔐 **Requires Authentication**
 *
 *       Returns monthly income vs expense using aggregation by month and type.
 *
 *       ⚡ Check **Server Response** above for actual analytics output.
 *
 *       ----------------------------------------
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of { month, income, expense }
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonthlyIncomeExpense'
 *             example:
 *               - month: Jan
 *                 income: 5000
 *                 expense: 3000
 *               - month: Feb
 *                 income: 4200
 *                 expense: 2800
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
 *     description: |
 *       🔐 **Requires Authentication**
 *
 *       ⚡ Check **Server Response** above for latest records.
 *
 *       ----------------------------------------
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