const express = require("express");
const router = express.Router();
const { fetchUsers } = require("src/controllers/user");

router.get("/", fetchUsers);

module.exports = router;
