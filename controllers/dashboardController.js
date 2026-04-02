const Record = require("../models/record");

exports.getSummary = async (req, res) => {
  try {
    const income = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
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
        {
          $group: {
            _id: "$category",
            total: { $sum: "$amount" }
          }
        }
      ]);
  
      res.json(data);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentTransactions = async (req, res) => {
    try {
      const data = await Record.find()
        .sort({ createdAt: -1 })
        .limit(5);
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };