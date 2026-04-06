const express = require("express");
const router = express.Router();

const { register, login, getAllUsers } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [viewer, analyst, admin]
 *                 default: viewer
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Email already registered
 */
router.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           example:
 *             email: vansh@gmail.com
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login successful — returns JWT and user (without password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: Invalid email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: List all users (paginated)
 *     description: Admin only.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (5 users per page)
 *     responses:
 *       200:
 *         description: Array of users (password omitted)
 */
router.get("/all", auth, role("admin"), getAllUsers);

module.exports = router;