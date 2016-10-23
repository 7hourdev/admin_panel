var sequelize = require('../db');
var DataTypes = require('sequelize');

module.exports = sequelize.define("sites", {
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
    },
    contents: {
        type: DataTypes.ARRAY(DataTypes.UUID),
    },
});
