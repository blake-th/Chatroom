var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var errorRouter = require('./routes/error');
var chatroomRouter = require('./routes/chatroom');
var loginRouter = require('./routes/login');



var expressApp = express();

// view engine setup
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//expressApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
expressApp.use(logger('dev'));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));

expressApp.use('/', index);
expressApp.use('/users', users);

expressApp.use('/chatroom', chatroomRouter);
expressApp.use('/login', loginRouter);

//  // catch 404 and forward to error handler
//  expressApp.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//  });

//  // error handler
//  expressApp.use(function(err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.expressApp.get('env') === 'development' ? err : {};

//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
//  });

expressApp.use(errorRouter);

//  expressApp.use(catch404);
//  expressApp.use(errorHandler);

//  function catch404(req, res, next) {
//      var err = new Error('Not Found');
//      err.status = 404;
//      next(err);
//  }

//  function errorHandler(err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.expressApp.get('env') === 'development' ? err : {};

//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
//  }

module.exports = expressApp;
