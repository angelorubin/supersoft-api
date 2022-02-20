const express = require("express");
const router = express.Router();
// const db = require("config/db");

/* GET signin */
router.get("/", function (req, res, next) {
  res.json({ message: "GET signin route" });
});

/* POST signin */
router.post("/", function (req, res, next) {});

module.exports = router;
