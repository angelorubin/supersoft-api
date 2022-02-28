const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}
