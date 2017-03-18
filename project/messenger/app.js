var expressApp = require('./expressApp');
var http = require('http');
var socketio = require('./socketio');


var app = {
	expressApp: expressApp,
	httpServer: null,
	io: null,
	createServer: function() {
		this.httpServer = http.createServer(this.expressApp);
		this.io = socketio.runOn(this.httpServer);
	},
	setPort: function(portNo) {
		this.expressApp.set('port', portNo);
	}
}


module.exports = app;