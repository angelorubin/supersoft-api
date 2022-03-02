/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("user", (table) => {
    table.increments("id");
    table.string("email");
    table.string("password");
    table.enum("role", ["basic", "supervisor", "admin"]).defaultTo("basic");
    table.string("accessToken");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("user");
};
