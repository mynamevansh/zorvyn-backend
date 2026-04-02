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

router.post(
  "/",
  auth,
  role("admin"),
  validateRecord,
  createRecord
);

router.get(
  "/",
  auth,
  role("admin", "analyst", "viewer"),
  getRecords
);

router.put(
  "/:id",
  auth,
  role("admin"),
  validateRecord,
  updateRecord
);

router.delete(
  "/:id",
  auth,
  role("admin"),
  deleteRecord
);

module.exports = router;