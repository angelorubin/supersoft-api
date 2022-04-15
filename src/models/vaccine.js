const bookshelf = require("src/config/db");

// Defining and registering a model
const VaccineCovid19 = bookshelf.Model.extend({
  tableName: "vaccine_covid19",
});

module.exports = VaccineCovid19;
