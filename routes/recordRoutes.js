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
 *     summary: Get records
 *     description: |
 *       🔐 **Requires Authenticated User** (Admin/Analyst/Viewer)
 *
 *       ⚡ After clicking **Execute**, use **Server Response** above for live output.
 *
 *       ----------------------------------------
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
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
 *             example:
 *               total: 12
 *               page: 1
 *               pages: 3
 *               data:
 *                 - _id: "507f1f77bcf86cd799439011"
 *                   amount: 500
 *                   type: expense
 *                   category: Food
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