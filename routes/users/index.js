const express = require("express");
const router = express.Router();
const db = require("config/db");
const { addUser } = require("./service");

/* GET users listing */
router.get("/", function (req, res, next) {
  res.json({ message: "get route" });
});

/* POST users */
router.post("/", async function (req, res, next) {
  const { email, password_digest } = req.body;

  const addUserResult = await addUser({ email, password_digest });

  res.json({ result: addUserResult });

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
