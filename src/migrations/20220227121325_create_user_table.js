/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	knex.schema.createTable("user", (table) => {
		table.uuid("id").primary();
		table.string("email");
		table.string("password");
		table.enum("role", ["basic", "supervisor", "admin"]);
		table.string("accessToken");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
