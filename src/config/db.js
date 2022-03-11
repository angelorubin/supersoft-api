const config = require("knexfile")[process.env.NODE_ENV];
const knex = require("knex")(config);
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;
