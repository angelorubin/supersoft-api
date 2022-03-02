const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
	res.json({ message: "get route" });
});

router.post("/", async function (req, res, next) {
	const { email, password } = req.body;

	res.json({ email });

	/*
	try {
		await db.transaction(async function (trx) {
			const user = {
				email,
				password_digest,
			};

			db("user")
				.insert(user)
				.transacting(trx)
				.returning(["email", "password_digest"])
				.then((users) => {
					res.json(users[0]);
				});
		});
	} catch (error) {
		return next(error);
	}
	*/
});

module.exports = router;
