/**
 * Module Dependencies
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var passport = require('passport');
var YahooStrategy = require('passport-yahoo-oauth').Strategy;

/**
 * Config
 */

// TODO: Make this cleaner

var APP_KEY = process.env.APP_KEY || require('./conf.js').APP_KEY;
var APP_SECRET = process.env.APP_SECRET || require('./conf.js').APP_SECRET;
var APP_URL = process.env.APP_URL || require('./conf.js').APP_URL;
var APP_PORT = process.env.PORT || 4000;

// TODO Move this out

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'Happy Kitty Soft Kitty'
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'jade');

var commonRoutes = require('./routes/common');
var authRoutes = require('./routes/auth');
var consoleRoutes = require('./routes/console');
var getDataRoutes = require('./routes/data');

app.use('/', commonRoutes);
app.use('/auth', authRoutes);
app.use('/resource', consoleRoutes);
app.use('/collection', consoleRoutes);
app.use('/data', getDataRoutes);

app.listen(APP_PORT, function() {
    console.log('Express server listening on port ' + APP_PORT);
});
