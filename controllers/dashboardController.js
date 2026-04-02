const mongoose = require("mongoose");
const Record = require("../models/record");

function ownerId(req) {
  return new mongoose.Types.ObjectId(req.user.id);
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

exports.getSummary = async (req, res) => {
  try {
    const uid = ownerId(req);

    const income = await Record.aggregate([
      { $match: { createdBy: uid, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Record.aggregate([
      { $match: { createdBy: uid, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryBreakdown = async (req, res) => {
    try {
      const data = await Record.aggregate([
        { $match: { createdBy: ownerId(req) } },
        {
          $group: {
            _id: { category: "$category", type: "$type" },
            total: { $sum: "$amount" },
          },
        },
      ]);

      res.json(
        data.map((item) => ({
          category: item._id.category,
          type: item._id.type,
          total: item.total,
        }))
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: { createdBy: ownerId(req) } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(
      data.map((item) => ({
        month: MONTH_LABELS[item._id - 1],
        total: item.total,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentTransactions = async (req, res) => {
    try {
      const data = await Record.find({ createdBy: ownerId(req) })
        .sort({ createdAt: -1 })
        .limit(5);
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };