/**
 * Script para criação do banco de dados antes do start da API
 */

require("dotenv").config();
const pgtools = require("pgtools");

const config = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	password: process.env.PG_PASS,
	port: process.env.PG_PORT,
};

const dbName = process.env.PG_DB;

pgtools.createdb(config, dbName, function (err, res) {
	if (err) {
		console.error({
			message: `Database "${dbName}" already exists and will be used.`,
			error: err.message,
		});
		return;
		// process.exit(-1);
	}
	console.log({
		message: `Database "${dbName}" was created successfully.`,
		res,
	});
});
