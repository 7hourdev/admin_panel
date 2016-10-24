var Sequelize = require("sequelize");
var config = require("../config").db;

var sequelize = new Sequelize(config.name, config.user, config.pass, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: (process.argv.length >= 2 && process.argv[2] == "test") ? false : console.log
});

module.exports = sequelize;
