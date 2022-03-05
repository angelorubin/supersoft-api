const express = require("express");
const router = express.Router();
const { createUser, listAllUsers } = require("src/controllers/signup");

router.get("/", listAllUsers);

router.post("/", createUser);

module.exports = router;
