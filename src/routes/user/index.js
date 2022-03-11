const express = require("express");
const router = express.Router();
const {
	fetchUsers,
	fetchUser,
	allowIfLoggedin,
} = require("src/controllers/user");

router.get("/", allowIfLoggedin, fetchUsers);

router.get("/:userId", fetchUser);

module.exports = router;
