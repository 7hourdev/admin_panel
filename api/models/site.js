var sequelize = require('../db');
var DataTypes = require('sequelize');
var Content = require('./content');
var User = require('./user');

var Site = sequelize.define("sites", {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    }
});

module.exports = Site;
