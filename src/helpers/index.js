const bcrypt = require("bcrypt");

exports.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
};

exports.validatePassword = async function (plainPassword, hashedPassword) {
	return await bcrypt.compare(plainPassword, hashedPassword);
};
