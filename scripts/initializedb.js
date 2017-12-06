var fs = require('fs');
var config = require('../config').db;
var stream = fs.createWriteStream("gen_user.script");
stream.once('open', function(fd) {
  stream.write("CREATE ROLE " + config.user + " WITH LOGIN PASSWORD '" +  config.pass + "';\n");
  stream.write("CREATE DATABASE " + config.name + ";\n");
  stream.write("GRANT ALL PRIVILEGES ON DATABASE " + config.name + " TO " + config.user + ";\n");
  stream.end();
});