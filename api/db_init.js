var Sequelize = require("./db");
var Model = require('./model');

//Sequelize.sync({force: true}).then(function() {
Sequelize.sync().then(function() {

    var dummy = Model.Content.build({
        name: 'dummy',
        content: 'Test data'
    })
    dummy.save();

    console.log('DB Sync Completed');
});
