var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var error = require('./routes/error');
var chatroom = require('./routes/chatroom');
var login = require('./routes/login');
var lobby = require('./routes/lobby');

var loginAction = require('./util/loginAction');
var lobbyAction = require('./util/lobbyAction');
var chatroomAction = require('./util/chatroomAction');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', index);
app.register = {}; // userName: password
app.friendList = {}; // userName: friendList
app.oldMessage = {};// id: messageList
app.loginAction = loginAction(app);
app.lobbyAction = lobbyAction(app);
app.chatroomAction = chatroomAction(app);

app.use('/', login);
app.use('/users', users);

app.use('/login', login);
app.use('/lobby', lobby);
app.use('/chatroom', chatroom);

//app.use('/lobby', express.static(path.join(__dirname, 'public')));


//  // catch 404 and forward to error handler
//  app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//  });

//  // error handler
//  app.use(function(err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};

//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
//  });

app.use(error);

//  app.use(catch404);
//  app.use(errorHandler);

//  function catch404(req, res, next) {
//      var err = new Error('Not Found');
//      err.status = 404;
//      next(err);
//  }

//  function errorHandler(err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};

//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
//  }

app.setSocketio = function(socketio) {
	chatroom.setSocketio(app, socketio);
}

module.exports = app;
