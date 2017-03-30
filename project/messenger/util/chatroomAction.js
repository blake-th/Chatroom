//var fs = require('fs');


module.exports = function(app) {
	return {
		app: app,
		storeMessage: function(from, to, content) {
			var [name1, name2] = [from, to].sort();
			var hash = name1+'-'+name2;
			this.app.oldMessage[hash].push({
				from: from,
				to: to,
				content: content,
				timestamp: new Date
			});
		},
		getOldMessage: function(from, to) {
			console.log('FROM',from,'TO',to);
			var [name1, name2] = [from, to].sort();
			var hash = name1+'-'+name2;
			console.log('HASH:', hash);
			return this.app.oldMessage[hash];
		}
	}
};