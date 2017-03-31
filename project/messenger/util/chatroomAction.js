module.exports = function(app) {
	return {
		app: app,
		storeMessage: function(from, to, content) {
			var app = this.app;


			console.log('FROM:', from);
			console.log('TO:', to);
			console.log('QQQQQQQQ');
			console.log(app.messageList);
			//console.log(app.messageList[from])
			//console.log(app.messageList[from][to]);
			//console.log(app.messageList[to])
			//console.log(app.messageList[to][from]);

			var date = new Date;
			var newMessage = {
				from: from,
				to: to,
				content: content,
				timestamp: date
			};

			if (to.indexOf('--') === -1) {
				var tmp1 = app.messageList[from][to].push(newMessage);
				if (from === to)
					return newMessage;
				var tmp2 = app.messageList[to][from].push(newMessage);
				//console.log('TMP1', tmp1);
				//console.log('TMP2', tmp2);
			} else {
				var updateList = to.split('--')[1].split('-');
				console.log('UPDATE LIST:', updateList);
				//updateList.push(from);
				updateList.forEach(function(userName, index, array) {
					app.messageList[userName][to].push(newMessage);
				});
			}
			
			return newMessage;
		},
		getOldMessage: function(from, to) {
			console.log('FROM',from,'TO',to);

			return this.app.messageList[from][to];
		}
	}
};

/*module.exports = function(app) {
	return {
		app: app,
		storeMessage: function(from, to, content) {
			var [name1, name2] = [from, to].sort();
			var hash = name1+'-'+name2;
			
				var newMessage = {
				from: from,
				to: to,
				content: content,
				timestamp: new Date
			};
			this.app.oldMessage[hash].push(newMessage);
			return newMessage;
		},
		getOldMessage: function(from, to) {
			console.log('FROM',from,'TO',to);
			var [name1, name2] = [from, to].sort();
			var hash = name1+'-'+name2;
			console.log('HASH:', hash);
			return this.app.oldMessage[hash];
		}
	}
};*/