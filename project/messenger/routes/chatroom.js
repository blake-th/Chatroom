var express = require('express');
var router = express.Router();

var path = require('path');

var chatroomAction = require('../util/chatroomAction.js');

router.use(express.static(path.resolve('public')));


/* GET home page. */
router.get('/:chatid', function(req, res, next) {
	var [from, to] = req.params.chatid.split('-');
  res.render('chatroom', {'to': to});
  //var nsp = this.io.of('/'+req.params.chatid);
});

router.setSocketio = function(app, io) {
	router.io = io;
	router.app = app;
	io.on('connection', function(socket) {
		console.log('a user connected~~');
		socket.emit('system message', 'System Say Hi');


		socket.on('connectTo', function(msg) {
			//console.log('connect to: ', path.basename(msg.connectTo));
			//socket.join(path.basename(msg.connectTo));
			console.log('connect to: ', msg.roomName);
			var [from, to] = msg.roomName.split('-');
			socket.join(msg.roomName);
			io.to(msg.roomName).emit('system message', 'join room');
			console.log('OLD MESSAGE:', app.chatroomAction['getOldMessage'](from, to));
			socket.emit('old message', app.chatroomAction['getOldMessage'](from, to));
		})

		//var _this = this;
		socket.on('chat message', function(msg) {
			console.log('receive message: ', msg);
			io.to(msg.roomName).emit('chat message', app.chatroomAction['storeMessage'](msg.from, msg.to, msg.content));
		});

		socket.on('disconnect', function() {
			console.log('a user disconnected!!');
		})
	});
};
module.exports = router;
