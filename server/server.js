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
app.use(cors());
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
  .catch(err => console.error(err));

app.use("/api/donations", donationRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use(cors({ origin: true, credentials: true }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
