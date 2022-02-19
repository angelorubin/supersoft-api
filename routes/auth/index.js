let express = require("express");
let router = express.Router();
let knex = require("config/db");

/* GET Auth */
router.get("/", function (req, res, next) {
	res.json({ message: "GET Auth" });
});

/* POST Auth */
router.post("/", function (req, res, next) {
	const { email, password } = req.body;

	// console.log(knex.select("email").from("users"));

	res.end();
});

module.exports = router;
