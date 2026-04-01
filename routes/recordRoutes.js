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

// Admin only
router.post("/", auth, role("admin"), createRecord);

// All roles can view
router.get("/", auth, role("admin", "analyst", "viewer"), getRecords);

// Admin only
router.put("/:id", auth, role("admin"), updateRecord);
router.delete("/:id", auth, role("admin"), deleteRecord);

module.exports = router;