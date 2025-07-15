const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");


// Add donation with error handling
router.post("/", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.json({ message: "Donation saved!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save donation." });
  }
});


// Get donations with error handling
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const donations = await Donation.find(month ? { month } : {});
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations." });
  }
});

module.exports = router;
