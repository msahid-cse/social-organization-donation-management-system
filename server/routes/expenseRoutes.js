const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

router.post("/", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json({ message: "Expense saved!" });
});

router.get("/", async (req, res) => {
  const { month } = req.query;
  const expenses = await Expense.find(month ? { month } : {});
  res.json(expenses);
});

module.exports = router;
