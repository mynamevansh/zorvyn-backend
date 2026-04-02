const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Record = require("../models/record");

// Create Record
exports.createRecord = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const record = await Record.create({
      ...req.body,
      createdBy: new mongoose.Types.ObjectId(req.user.id), // ✅ FIXED
    });

    res.status(201).json(record);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Records (with filtering + pagination)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 5 } =
      req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    filter.createdBy = req.user.id;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 5);

    const records = await Record.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Record
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Record
exports.deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};