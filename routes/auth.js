let express = require("express");
let router = express.Router();
let knex = require("../config/db");

/* GET Auth */
router.get("/", function (req, res, next) {
	res.json({ message: "GET Auth" });
});

/* POST Auth */
router.post("/", function (req, res, next) {
	const { email, password } = req.body;

	knex
		.raw("SELECT 1")
		.then(() => {
			console.log("PostgreSQL connected");
			res.json({ message: "PostgreSQL connected" });
		})
		.catch((e) => {
			console.log("PostgreSQL not connected");
			console.error(e);
		});
});

module.exports = router;
