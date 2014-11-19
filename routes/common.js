var express = require('express');
var app = express();
var router = express.Router();

var controller = require('../controllers/common');

var common = function() {

    router.get('/', controller.index);

    return router;

}();

module.exports = common;
