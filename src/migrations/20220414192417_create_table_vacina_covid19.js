/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("vaccine_covid19", (table) => {
    table.increments().primary();
    table.string("nome_vacina").notNullable();
    table.string("nome_fabricante").notNullable();
    table.string("pais_origem").notNullable();
    table.string("quantidade_minimas_doses").notNullable();
    table.string("percentual_eficacia_comprovada").notNullable();
    table.string("preco_venda_por_dose").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("vaccine_covid19");
};
