const bookshelf = require("src/config/db");

// Defining and registering a model
const User = bookshelf.Model.extend({
  tableName: "user",
  hidden: "password",
});

module.exports = User;
