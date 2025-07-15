const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  month: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);
