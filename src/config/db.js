const config = require("knexfile")[process.env.NODE_ENV];
const knex = require("knex")(config);
const DB = require("bookshelf")(knex);
module.exports = DB;
