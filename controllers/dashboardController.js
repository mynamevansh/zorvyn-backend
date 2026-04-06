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
          _id: { month: { $month: "$date" }, type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const monthMap = new Map();
    for (const row of data) {
      const monthNum = row._id.month;
      const type = row._id.type;
      if (!monthMap.has(monthNum)) {
        monthMap.set(monthNum, {
          month: MONTH_LABELS[monthNum - 1],
          income: 0,
          expense: 0,
        });
      }
      const entry = monthMap.get(monthNum);
      if (type === "income") entry.income = row.total;
      if (type === "expense") entry.expense = row.total;
    }

    const result = [...monthMap.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentTransactions = async (req, res) => {
    try {
      const data = await Record.find({ createdBy: ownerId(req) })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("-__v")
        .lean();
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
