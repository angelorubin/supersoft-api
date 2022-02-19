const config = require("knexfile")[process.env.ENVIRONMENT];
const knex = require("knex")(config);
module.exports = knex;
