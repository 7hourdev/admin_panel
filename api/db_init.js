var Sequelize = require("./db");
var Model = require('./model');
var reset = require('../config').reset;

// Move this elsewhere
Model.Site.belongsToMany(Model.User, {
    through: "UserSite"
});
Model.User.belongsToMany(Model.Site, {
    through: "UserSite"
});
Model.Site.hasMany(Model.Content);
Model.Content.belongsTo(Model.Site);    

Sequelize.sync({force: reset}).then(function() {
    console.log('DB Sync Completed');
});
