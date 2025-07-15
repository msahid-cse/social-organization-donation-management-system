const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  reason: String,
  amount: Number,
  month: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", expenseSchema);
