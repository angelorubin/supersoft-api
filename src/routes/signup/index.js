const express = require("express");
const router = express.Router();
const { createUser, listAllUsers } = require("src/controllers/signup");

router.post("/", createUser);

router.get("/", listAllUsers);

module.exports = router;
