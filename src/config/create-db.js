require("dotenv").config();
const pgtools = require("pgtools");

const config = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	password: process.env.PG_PASS,
	port: process.env.PG_PORT,
};

const dbName = "test";

pgtools.createdb(config, dbName, function (err, res) {
	if (err) {
		console.error({
			message: `O banco de dados "${dbName}" já existe.`,
		});
		return;
		// process.exit(-1);
	}
	console.log(res);
});
