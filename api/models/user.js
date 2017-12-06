var sequelize = require('../db');
var DataTypes = require('sequelize');
var bcrypt = require('bcrypt');

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
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    }
});

User.prototype.savePassword = function(password) {
    var self = this;
    return bcrypt
        .hash(password, 12)
        .then((hash) => {
            console.log(hash);
            self.password = hash;
            self.save();
        });
}

User.prototype.validPassword = function(password) {
    var self = this;
    return bcrypt
        .compare(password, self.password)
        .then(res=>res);
}

module.exports = User;
