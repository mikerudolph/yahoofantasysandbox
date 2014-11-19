var express = require('express');
var app = express();
var router = express.Router();

var controller = require('../controllers/auth');

var auth = function() {

    router.get('/yahoo', controller.index, function(req, res) { res.redirect('/'); });
    router.get('/yahoo/callback', controller.innerCallback, controller.handleCallback);
    router.get('/logout', controller.handleLogout);

    return router;

}();

module.exports = auth;
