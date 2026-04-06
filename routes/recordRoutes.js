const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const { body } = require("express-validator");

const validateRecord = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be either income or expense"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),
];

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new record
 *     description: |
 *       🔐 **Requires Admin Role**
 *
 *       ⚡ After clicking **Execute**:
 *       - Check **Server Response** above for actual result
 *       - Below section shows example/documentation format
 *
 *       ----------------------------------------
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       201:
 *         description: Record created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *             example:
 *               _id: "507f1f77bcf86cd799439011"
 *               amount: 1500
 *               type: income
 *               category: Salary
 *               notes: Monthly pay
 *               createdAt: "2025-01-15T10:00:00.000Z"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               errors:
 *                 - msg: Amount must be a number
 *                   param: amount
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: No token
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.post(
  "/",
  auth,
  role("admin"),
  validateRecord,
  createRecord
);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get records with filters
 *     description: |
 *       📊 Fetch financial records
 *
 *       🔹 Example usage:
 *       - type = income
 *       - category = Salary
 *       - startDate = 2026-01-01
 *       - endDate = 2026-12-31
 *       - page = 1
 *       - limit = 5
 *
 *       ⚠️ Note:
 *       - Category is case-sensitive
 *       - Leave fields empty to get all records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         description: Filter by record type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         example: income
 *       - in: query
 *         name: category
 *         description: Filter by exact category name (case-sensitive)
 *         schema:
 *           type: string
 *         example: Salary
 *       - in: query
 *         name: startDate
 *         description: Start date for date range filter (inclusive)
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-01-01"
 *       - in: query
 *         name: endDate
 *         description: End date for date range filter (inclusive)
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-12-31"
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 5
 *         example: 5
 *     responses:
 *       200:
 *         description: List of records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 pages:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Record'
 *             examples:
 *               filteredIncome:
 *                 summary: Filtered by income category with pagination
 *                 value:
 *                   total: 2
 *                   page: 1
 *                   pages: 1
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439011"
 *                       amount: 5000
 *                       type: income
 *                       category: Salary
 *                       notes: Monthly salary
 *                       createdAt: "2026-03-01T10:00:00.000Z"
 *                     - _id: "507f1f77bcf86cd799439012"
 *                       amount: 750
 *                       type: income
 *                       category: Salary
 *                       notes: Bonus
 *                       createdAt: "2026-03-15T10:00:00.000Z"
 *               allRecords:
 *                 summary: No filters (all accessible records)
 *                 value:
 *                   total: 12
 *                   page: 1
 *                   pages: 3
 *                   data:
 *                     - _id: "507f1f77bcf86cd799439013"
 *                       amount: 500
 *                       type: expense
 *                       category: Food
 *                       notes: Groceries
 *                       createdAt: "2026-02-10T08:00:00.000Z"
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
router.get(
  "/",
  auth,
  role("admin", "analyst", "viewer"),
  getRecords
);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     description: |
 *       🔐 **Requires Admin Role**
 *
 *       ⚡ Check **Server Response** above for real update payload.
 *
 *       ----------------------------------------
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       200:
 *         description: Updated record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               errors:
 *                 - msg: Category is required
 *                   param: category
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Invalid token
 *       403:
 *         description: Access denied
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Record not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.put(
  "/:id",
  auth,
  role("admin"),
  validateRecord,
  updateRecord
);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     description: |
 *       🔐 **Requires Admin Role**
 *
 *       ⚡ Check **Server Response** above for final delete status.
 *
 *       ----------------------------------------
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Record deleted
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: No token
 *       403:
 *         description: Access denied
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Record not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Internal server error
 */
router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteRecord
);

module.exports = router;