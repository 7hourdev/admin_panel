var sequelize = require('../db');
var DataTypes = require('sequelize');

module.exports = sequelize.define("contents", {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.STRING
    },
});
