/**
 * Script para criação do banco de dados (padrão) antes da inicialização da API
 */
require("dotenv").config();
const pgtools = require("pgtools");

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
};

const pgDbName = process.env.PG_DB;

pgtools.createdb(config, pgDbName, function (err, res) {
  if (err) {
    console.error({
      message: `Database "${pgDbName}" already exists and will be used.`,
      error: err.message,
    });
    return;
  }

  console.log({
    message: `Database "${pgDbName}" was created successfully.`,
    res,
  });
});
