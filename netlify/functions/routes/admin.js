const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });
  if (!admin) return res.status(401).json({ detail: "Invalid credentials" });

  res.json({ admin });
});

module.exports = router;
