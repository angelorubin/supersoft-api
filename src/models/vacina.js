const bookshelf = require("src/config/db");

// Defining and registering a model
const VacinaCovid19 = bookshelf.Model.extend({
	tableName: "vacina_covid19",
});

module.exports = VacinaCovid19;
