/**
 * Module dependencies.
 */

require("dotenv").config();
require("app-module-path").addPath(__dirname);
const path = require("path");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
let express = require("express");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();

// router
let signupRouter = require("src/routes/signup");
let signinRouter = require("src/routes/signin");
let userRouter = require("src/routes/user");

// middlewares
// app.use(createDatabase);
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
	if (req.headers["x-access-token"]) {
		const accessToken = req.headers["x-access-token"];
		const { userId, exp } = await jwt.verify(
			accessToken,
			process.env.JWT_SECRET
		);
		// check if token has expired
		if (exp < Date.now().valueOf() / 1000) {
			return res.status(401).json({
				error: "JWT token has expired, please login to obtain a new one",
			});
		}
		// res.locals.loggedInUser = await User.findById(userId);
		next();
	} else {
		next();
	}
});

// routes
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

	// render the error page
	// res.status(err.status || 500);
	// res.render("error");
	res.status(err.status || 500).json({
		message: err.message,
		error: err,
	});
});

module.exports = app;
