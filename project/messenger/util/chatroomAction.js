module.exports = function(app) {
	return {
		app: app,
		storeMessage: function(from, to, content) {
			var app = this.app;
			var date = new Date;
			var newMessage = {
				from: from,
				to: to,
				content: content,
				timestamp: date
			};
			if (to.indexOf('--') === -1) {
				app.messageList[from][to].push(newMessage);
				if (from === to)
					return newMessage;
				app.messageList[to][from].push(newMessage);
			} else {
				var updateList = to.split('--')[1].split('-');
				updateList.forEach(function(userName, index, array) {
					app.messageList[userName][to].push(newMessage);
				});
			}
			return newMessage;
		},
		getOldMessage: function(from, to) {
			return this.app.messageList[from][to];
		}
	}
};