var express = require('express');
var path = require('path');
var cors = require('cors');
var compression = require('compression');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require('./../webpack.config');
var config = require('../config');

var app = express();
var compiler = webpack(webpackConfig);

var Model = require('./model');
require('./db_init');

app.use(cors());

app.use(webpackDevMiddleware(compiler,{
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(compression());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../public')));

var stormpath = require("express-stormpath");
var stormpath_client = require("stormpath");

var User = require('./models/user');

app.use(stormpath.init(app, {
    apiKey: {
        id: config.stormpath.apiKey.id,
        secret: config.stormpath.apiKey.secret
    },
    application: {
        href: config.stormpath.application
    },
    website: true,
    debug: "info",
    web: {
        login: {
            enabled: true,
            nextUri: "/"
        },
        changePassword: {
            autoLogin: false,
            nextUri: "/",
        }
    },
    postRegistrationHandler: function (account, req, res, next) {
        var user = User.build({
            username: account.username,
            email: account.email,
        });
        user.save();
        next();
    }
}));

if(config.reset){
    var client = new stormpath_client.Client({
        apiKey: {
            id: config.stormpath.apiKey.id,
            secret: config.stormpath.apiKey.secret
        }
    });
    client.getApplication(config.stormpath.application, function(err, app) {
        app.getAccounts(function(err2, accounts) {
            if (err2){
                console.log("ERROR: " + err2);
            }
            accounts.map(function(account){
                var user = User.build({
                    username: account.username,
                    email: account.email,
                    createdAt: account.createdAt,
                    modifiedAt: account.modifiedAt,
                });
                if (user.email==="david.lky.123@gmail.com" || user.email==="jeffrey.ying86@live.com"){
                    user.type =1;
                }
                user.save();
            });
        });
    });
}

app.use(stormpath.getUser);

// custom routes
var api_route = require('./routes/api');
app.use('/api', api_route);

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
