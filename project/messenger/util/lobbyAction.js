//var fs = require('fs');

module.exports = function(app) {
	return {
		app: app,
		addFriend: function(userName, friendName) {
			if (!(friendName in this.app.register))
				return 'user not found';
			var friendList = this.app.friendList[userName];
			if (friendList.indexOf(friendName) !== -1)
				return 'friend already';

			friendList.push(friendName);
			this.app.friendList[friendName].push(userName);

			var [name1,name2] = [userName, friendName].sort();
			var hash = name1 + '-' + name2;
			this.app.oldMessage[hash] = [
			{
				from: userName,
				to: friendName,
				content: 'Hi~',
				timestamp: new Date
			},
			{
				from: friendName,
				to: userName,
				content: 'Hi~',
				timestamp: new Date
			}
			];
			return 'add successful';
		},
		getFriendList: function(userName) {
			return {'friend': this.app.friendList[userName]};
			//return {"friend":[{"name":"you","lastMessage":"hello","timestamp":"00:00"},{"name":"jacky","lastMessage":"bye","timestamp":"20:48"}],"group":[]};
		},
		chatFriend: function(userName, friendName) {
			//var tmp = [userName, friendName].sort();
			return userName+'-'+friendName;
		}
	}
};