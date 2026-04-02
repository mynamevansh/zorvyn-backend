const express = require("express");
const router = express.Router();

const { register, login, getAllUsers } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/all", auth, role("admin"), getAllUsers);

module.exports = router;