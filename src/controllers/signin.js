const User = require("src/models/user");
const { validatePassword } = require("src/helpers");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		res.json({ email });

		const user = await User.where({ email })
			.fetch()
			.then((user) => {
				if (user.attributes.email.length > 0) {
					const { id, email, password, role } = user.attributes;
					return { id, email, password, role };
				} else {
					return null;
				}
			});

		console.log(user);

		/**
		if (!user) return next(new Error("Email does not exist"));

		const validPassword = await validatePassword(password, user.password);

		if (!validPassword) return next(new Error("Password is not correct"));

		const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		let updateAccessToken = await User.where({ id }).fetch({
			require: true,
		});

		updateAccessToken.set({ access_token: accessToken });

		// updateAccessToken.save();

		res.status(200).json({
			data: { email: user.email, role: user.role },
			accessToken,
		});
		*/
	} catch (error) {
		next(error);
	}
};
