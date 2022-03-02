const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
	const users = await getUsers();
	console.log(users);
	res.json({ message: "get route signin" });
});

router.post("/", async function (req, res, next) {
	const { email, password } = req.body;

	res.json({ email, password });
});

module.exports = router;
