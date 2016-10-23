var Sequelize = require("sequelize");
var sequelize = new Sequelize('admin', 'postgres', '', {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: (process.argv.length >= 2 && process.argv[2] == "test") ? false : console.log
});

module.exports = sequelize;
