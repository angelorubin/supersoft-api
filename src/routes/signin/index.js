const express = require("express");
const router = express.Router();
const { signin } = require("../../controllers/userController");

router.get("/", async (req, res, next) => {
	const users = await getUsers();
	console.log(users);
	res.json({ message: "get route signin" });
});

router.post("/", async function (req, res, next) {
	const { email, password } = req.body;

	signin();

	res.json({ email, password });
});

module.exports = router;
