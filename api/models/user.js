var sequelize = require('../db');
var DataTypes = require('sequelize');
var Site = require('./site');

var User = sequelize.define("users", {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255],
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255],
        }
    },
    type: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

User.hasMany(Site, {
    as: 'sites'
});

module.exports = User;
