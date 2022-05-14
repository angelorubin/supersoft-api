require("dotenv").config();

module.exports = {
	dev: {
		client: process.env.PG_CLIENT,
		connection: {
			database: process.env.PG_DB,
			user: process.env.PG_USER,
			password: process.env.PG_PASS,
		},
		pool: {
			min: 0,
			max: 7,
		},
		seeds: {
			directory: "./src/seeds/dev",
		},
		migrations: {
			directory: "src/migrations",
			tableName: "knex_migrations",
		},
	},
	production: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};
