var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');

var app = express();
mongoose.connect('mongodb://localhost/mvp');
//inserting middleware into app
middleware(app, express);

var port = 8000;
app.listen(port);

module.exports = app;
