const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("./service");

router.get("/", async (req, res, next) => {
	const users = await getUsers();
	console.log(users);
	res.json({ message: "get route signin" });
});

/* POST signin */
router.post("/", async function (req, res, next) {
	const { email, password } = req.body;

	const message = await createUser({ email, password });

	res.json({ message });
});

module.exports = router;
