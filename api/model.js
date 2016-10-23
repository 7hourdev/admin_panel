var sequelize = require('./db');
var DataTypes = require("sequelize");
var User = require('./models/user');
var Site = require('./models/site');
var Content = require('./models/content');

module.exports = {
    User: User,
    Site: Site,
    Content: Content
}
