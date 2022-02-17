let express = require("express");
let router = express.Router();

/* GET Auth */
router.get("/", function (req, res, next) {
	res.json({ message: "Auth Endpoint" });
});

/* POST Auth */
router.post("/", function (req, res, next) {
	const { email, password } = req.body;

	res.json({ message: "POST AUTH" });
});

module.exports = router;
