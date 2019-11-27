var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', apiRouter)
app.use('/*', express.static(path.join(__dirname, 'client/build')))

module.exports = app;
