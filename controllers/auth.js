var express = require('express');
var passport = require('passport');
var YahooStrategy = require('passport-yahoo-oauth').Strategy;
var app = express();

// TODO: Make this cleaner

var APP_KEY = process.env.APP_KEY || require('../conf.js').APP_KEY;
var APP_SECRET = process.env.APP_SECRET || require('../conf.js').APP_SECRET;
var APP_URL = process.env.APP_URL || require('../conf.js').APP_URL;
var APP_PORT = process.env.PORT || 4000;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new YahooStrategy({
    consumerKey: APP_KEY,
    consumerSecret: APP_SECRET,
    callbackURL: APP_URL + '/auth/yahoo/callback'
}, function(token, tokenSecret, profile, done) {
    var data = profile._json;

    var t = new Date().getTime();

    var user = {
        id: profile.id,
        name: data.profile.nickname,
        avatar: data.profile.image.imageUrl,
        dateJoined: t,
        lastUpdated: t,
        lastVisit: t,
        accessToken: token,
        tokenSecret: tokenSecret,
        sessionHandle: profile.oauth_session_handle
    };

    process.nextTick(function() {
        return done(null, user);
    });
}));

var authController = {
    index: passport.authenticate('yahoo', {
        failureRedirect: '/login'
    }),

    innerCallback: passport.authenticate('yahoo', {
        failureRedirect: '/login'
    }),

    handleCallback: function(req, res) {
        res.redirect(req.session.redirect || '/');
    },

    handleLogout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};



module.exports = authController;
