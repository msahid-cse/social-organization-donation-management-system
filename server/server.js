const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const donationRoutes = require("./routes/donationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS setup (allow credentials and frontend origin)
app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/donations", donationRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
