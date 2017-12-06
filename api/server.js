var express = require('express');
var path = require('path');
var cors = require('cors');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require('../config');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var Model = require('./model');
require('./db_init');

app.use(cors());

if (process.env.NODE_ENV != "production"){
    var webpack = require('webpack');
    var webpackConfig = require('./../webpack.config');
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");
    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler,{
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}

app.use(compression());

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({ secret: "adminportal" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    Model.User.findOne({where:{username: username }})
    .then((user)=>{
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      user = user.toJSON();
      delete user["password"];
      return done(null, user);
    })
    .catch((err)=>{
      return done(err);
    });
  }
));

app.use((req,res,next)=>{console.log(req.url);return next()})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

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
