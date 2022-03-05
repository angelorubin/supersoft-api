const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { hashPassword, validatePassword } = require("src/helpers");

exports.listAllUsers = async (req, res, next) => {
	res.json({ message: "list of all users" });
};

exports.createUser = async (req, res, next) => {
	try {
		const { email, password, role } = req.body;

		const hashedPassword = await hashPassword(password);

		/*
	try {
		await db.transaction(async function (trx) {
			const user = {
				email,
				password_digest,
			};

			db("user")
				.insert(user)
				.transacting(trx)
				.returning(["email", "password_digest"])
				.then((users) => {
					res.json(users[0]);
				});
		});
	} catch (error) {
		return next(error);
	}
	*/

		const newUser = new User({
			email,
			password: hashedPassword,
			role: role || "basic",
		});

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
	} catch (error) {
		next(error);
	}
};
