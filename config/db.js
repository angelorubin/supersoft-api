const knex = require("knex")({
	client: process.env.PG_CLIENT,
	connection: {
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB,
	},
	pool: { min: 0, max: 7 },
});

module.exports = knex;
