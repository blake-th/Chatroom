var express = require('express');
var router = express.Router();

var socketio = require('../util/socketio.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chatroom');
  //var hostServer = req.socket.server;
  //console.log('==================================================');
  //console.log(hostServer);
  socketio.runOn(req.socket.server);
  console.log(req.params);
});

module.exports = router;
