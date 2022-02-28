const config = require("knexfile")[process.env.NODE_ENV];
const knex = require("knex")(config);
const db = require("bookshelf")(knex);
module.exports = db;
