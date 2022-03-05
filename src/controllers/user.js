const User = require("src/models/user");

exports.fetchUsers = async (req, res, next) => {
	const users = await User.fetchAll({ require: true });

	// console.log(typeof users);

	// filter data (except password and access_token)
	const allowed = ["email"];

	users.map((user) => {
		console.log(user.attributes);
	});

	res.status(200).json({
		data: "",
	});
};
