var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');

var app = express();
var port = 8000;
mongoose.connect('mongodb://localhost/mvp');
middleware(app, express);

app.listen(port);

module.exports = app;
