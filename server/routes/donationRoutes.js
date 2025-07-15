const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

router.post("/", async (req, res) => {
  const donation = new Donation(req.body);
  await donation.save();
  res.json({ message: "Donation saved!" });
});

router.get("/", async (req, res) => {
  const { month } = req.query;
  const donations = await Donation.find(month ? { month } : {});
  res.json(donations);
});

module.exports = router;
