var express = require('express');
var router = express.Router();

var path = require('path');

var chatroomAction = require('../util/chatroomAction.js');

router.use(express.static(path.resolve('public')));


/* GET home page. */
router.get('/:chatid', function(req, res, next) {
  res.render('chatroom');
  //var nsp = this.io.of('/'+req.params.chatid);
});

router.setSocketio = function(io) {
	router.io = io;
	io.on('connection', function(socket) {
		console.log('a user connected~~');
		socket.emit('system message', 'System Say Hi');

		var _this = this;
		socket.on('chat message', function(msg) {
			console.log('receive message: '+msg);
			_this.emit('chat message', msg);
		});

		socket.on('disconnect', function() {
			console.log('a user disconnected!!');
		})
	});
};
module.exports = router;
