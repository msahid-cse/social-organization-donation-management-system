
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hash });
  await newUser.save();
  res.json({ message: "Admin registered!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.json({ message: "Login success" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

module.exports = router;
