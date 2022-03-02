const express = require("express");
const router = express.Router();
const { signup } = require("../../controllers/signupController");

router.get("/", function (req, res, next) {
	res.json({ message: "get route" });
});

router.post("/", signup);

module.exports = router;
