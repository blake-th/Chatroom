var express = require('express');
var router = express.Router();

var path = require('path');

router.use(express.static(path.resolve('public')));


/* GET home page. */
router.get('/:chatid', function(req, res, next) {
	//var io = require('socket.io')(req.app.httpServer);
	console.log('TOUCH!!!!!');
  res.render('chatroom');
  console.log('RENDER SUCCESS!!!');
});

router.runSocketio = function(io) {
	io.on('connection', function(socket) {
		console.log('a user connected~~');
		socket.emit('chat message', 'System Say Hi');
		var _this = this;
		socket.on('chat message', function(msg) {
			console.log('receive message: '+msg);
			_this.emit('chat message', msg);
		});
		socket.on('disconnect', function() {
			console.log('user disconnected!!');
		})
	});
};

module.exports = router;
