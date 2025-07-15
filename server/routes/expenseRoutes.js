const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");


// Add expense with error handling
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json({ message: "Expense saved!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save expense." });
  }
});


// Get expenses with error handling
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const expenses = await Expense.find(month ? { month } : {});
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses." });
  }
});

module.exports = router;
