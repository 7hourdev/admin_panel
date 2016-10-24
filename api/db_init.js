var Sequelize = require("./db");
var Model = require('./model');

// Move this elsewhere
Model.Site.hasMany(Model.Content);
Model.Content.belongsTo(Model.Site);
Model.User.hasMany(Model.Site);

Sequelize.sync({force: true}).then(function() {
    //Sequelize.sync().then(function() {

    console.log('DB Sync Completed');

    var dummy = Model.Site.build({
        name: '7hourdev',
        url: 'http://7hourdev.com',
        contents: [{
            name: 'about',
            content: 'we did good'
        }, {
            name: 'home',
            content: 'sup'
        }]
    }, {
        include: [Model.Content]
    })

    dummy.save();
});
