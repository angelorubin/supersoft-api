const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { hashPassword, validatePassword } = require("src/helpers");
const uuid = require("uuid");

exports.listAllUsers = async (req, res, next) => {
	res.json({ message: "list of all users" });
};

exports.createUser = async (req, res, next) => {
	try {
		const { email, password, role } = req.body;

		const hashedPassword = await hashPassword(password);

		let newUser = await new User({
			email,
			password: hashedPassword,
			role: role || "basic",
		}).save();

		const { id } = newUser;

		// generating the access token
		const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		// adding access token to newUser object
		newUser.attributes.accessToken = accessToken;

		// saving the new user's access token
		const user = await User.where({ id }).fetch();
		await user.save({ access_token: accessToken }, { patch: true });

		res.json({
			data: newUser,
		});

		/**
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		);

		newUser.accessToken = accessToken;

		await newUser.save();

		res.json({
			data: newUser,
			accessToken,
		});
		*/
	} catch (error) {
		next(error);
	}
};
