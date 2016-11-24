var Sequelize = require("./db");
var Model = require('./model');

// Move this elsewhere
Model.Site.belongsToMany(Model.User, {
    through: "UserSite"
});
Model.User.belongsToMany(Model.Site, {
    through: "UserSite"
});
Model.Site.hasMany(Model.Content);
Model.Content.belongsTo(Model.Site);    

Sequelize.sync({force: true}).then(function() {
    console.log('DB Sync Completed');
});
