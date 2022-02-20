const express = require("express");
const router = express.Router();
// const db = require("config/db");

/* POST signin */
router.post("/", function (req, res, next) {
  const { email, password_digest } = req.body;
  console.log(email, password_digest);

  res.json({ message: "POST signin route" });
});

module.exports = router;
