const bookshelf = require("src/config/db");

// Defining and registering a model
const User = bookshelf.Model.extend({
	tableName: "user",
});

module.exports = User;
