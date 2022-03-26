const User = require("src/models/user");
const { validatePassword } = require("src/helpers");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.where({ email })
			.fetch({ require: true })
			.then((user) => {
				if (user.attributes.email.length > 0) {
					const { id, email, password, role } = user.attributes;
					return { id, email, password, role };
				} else {
					return null;
				}
			});

		if (!user) return next(new Error("Email does not exist"));

		const validPassword = await validatePassword(password, user.password);

		if (!validPassword) return next(new Error("Password is not correct"));

		const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		let updateAccessToken = await User.where({ id: user.id }).fetch({
			require: true,
		});
		updateAccessToken.set({ access_token: accessToken });
		updateAccessToken.save();

		res.status(200).json({
			data: { email: user.email, role: user.role },
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};
