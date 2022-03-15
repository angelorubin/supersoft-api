const express = require("express");
const router = express.Router();
const {
	fetchUsers,
	fetchUserById,
	allowIfLoggedin,
	grantAccess,
} = require("src/controllers/user");

router.get("/", fetchUsers);

router.get("/:userId", fetchUserById);

module.exports = router;
