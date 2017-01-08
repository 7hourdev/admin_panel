var Sequelize = require("sequelize");
var config = require("../config").db;

var sequelize = new Sequelize(config.name, config.user, config.pass, {
  host: config.url,
  port: 5432,
  dialect: "postgres",
  logging: config.debug ? console.log : false
});

module.exports = sequelize;
