require("app-module-path").addPath(__dirname);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const knex = require("config/db");
const createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const session = require("express-session");
let cors = require("cors");
let bodyParser = require("body-parser");

// routes
let authRouter = require("routes/auth");
let usersRouter = require("routes/users");
let signinRouter = require("routes/signin");

let app = express();

// testing connection knex and postgres
/*
knex
	.raw("SELECT 1")
	.then(() => {
		console.log("PostgreSQL connected");
	})
	.catch((e) => {
		console.log("PostgreSQL not connected");
		console.error(e);
	});
	*/

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/signin", signinRouter);

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
