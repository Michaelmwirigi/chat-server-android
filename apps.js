var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: "240800",
  key: "32180ac7889144c3399e",
  secret: "8b44a1ce6528bfdd3ed9",
  encrypted: true
});

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/messages', function(req, res){
  var message = {
    text: req.body.text,
    name: req.body.name
  }
  pusher.trigger('chatroom', 'new_message', message);
  res.json({success: 200});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;