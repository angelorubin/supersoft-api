let express = require("express");
let router = express.Router();
let db = require("src/config/db");

/* GET Auth */
router.get("/", function (req, res, next) {
	res.json({ message: "GET auth" });
});

/* POST Auth */
router.post("/", function (req, res, next) {
	const { email, password } = req.body;

	// console.log(db.select("email").from("users"));

	res.end();
});

module.exports = router;
