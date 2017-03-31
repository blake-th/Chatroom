var express = require('express');
var router = express.Router();
var path = require('path');
var chatroomAction = require('../util/chatroomAction.js');

router.use(express.static(path.resolve('public')));

router.get('/:chatid', function(req, res, next) {
	var [from, to] = req.params.chatid.split('---');
	res.render('chatroom', {to: to});
});

router.setSocketio = function(app, io) {
	io.on('connection', function(socket) {
		socket.on('connectTo', function(msg) {
			socket.join(msg.roomName);
			socket.emit('old message', app.chatroomAction['getOldMessage'](msg.from, msg.to));
		});

		socket.on('chat message', function(msg) {
			io.to(msg.roomName).emit('chat message', app.chatroomAction['storeMessage'](msg.from, msg.to, msg.content));
		});
	});
};

module.exports = router;