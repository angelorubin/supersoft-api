/**
 * module dependencies
 */
require("dotenv").config();
require("app-module-path").addPath(__dirname);
const path = require("path");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const User = require("src/models/user");

/**
 * router
 */
const signupRouter = require("src/routes/signup");
const signinRouter = require("src/routes/signin");
const userRouter = require("src/routes/user");

/**
 * middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const verifyToken = async (req, res, next) => {
	const token = req.headers["authorization"].split(" ")[1];
	const secret = process.env.JWT_SECRET;

	if (token) {
		const { userId, exp } = await jwt.verify(token, secret);
		// Check if token has expired
		if (exp < Date.now().valueOf() / 1000) {
			return res.status(401).json({
				error: "JWT token has expired, please login to obtain a new one",
			});
		}
		const { attributes } = await User.where({ id: userId }).fetch();
		const { id, email, role } = attributes;

		res.locals.loggedInUser = { id, email, role };
		next();
	} else {
		next();
	}

	/*
	if (!req.headers.authorization || !req.headers.authorization === null) {
		return res.status(401).send("Unauthorized request 1");
	}

	if (token === "null") {
		return res.status(401).send("Unauthorized request 2");
	}

	let payload = jwt.verify(token, secret);
	if (!payload) {
		return res.status(401).send("Unauthorized request 3");
	}

	res.json({ payload });
	next();

	// res.locals.loggedInUser = payload.users[0].id;
	*/
};

app.use(verifyToken);

/**
 * routes
 */
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500).json({
		message: err.message,
		error: err,
	});
});

module.exports = app;
