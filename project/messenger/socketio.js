var socketio = require('socket.io');


module.exports = {
	io: null,
	runOn: function(server) {
		this.io = socketio(server);
		this.io.on('connection', function(socket) {
			console.log('A user connected...');
			socket.emit('chat message', 'system say hi');
			var _this = this;
			socket.on('chat message', function(msg) {
				console.log('receive message: '+msg);
				_this.emit('chat message', msg);
			});
			socket.on('disconnect', function() {
				console.log('user disconnect!!')
			});
		});
	}
};