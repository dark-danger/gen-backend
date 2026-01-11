const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB Connected");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/api/test", (req, res) => {
  res.json({ msg: "Backend running successfully" });
});

app.use("/api/admin", adminRoutes);

module.exports.handler = serverless(app);
