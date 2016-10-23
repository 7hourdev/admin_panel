var sequelize = require('../db');
var DataTypes = require('sequelize');

module.exports = sequelize.define("users", {
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
        validate: {
            defaultValue: 0,
        }
    },
    sites: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
});
