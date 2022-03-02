/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("user", (table) => {
		table.increments().primary();
		table.string("email").notNullable();
		table.string("password").notNullable();
		table.enum("role", ["basic", "supervisor", "admin"]).defaultTo("basic");
		table.string("access_token");
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.schema.dropTable("user");
};
