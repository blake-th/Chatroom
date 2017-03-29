//var fs = require('fs');

module.exports = function(app) {
	return {
		app: app,
		addFriend: function(userName, friendName) {
			var friendList = this.app.friendList[userName];
			if (friendList.indexOf(friendName) !== -1)
				return 'friend already';
			friendList.push(friendName);
			return 'add successful';
		},
		getFriendList: function(userName) {
			return {'friend': this.app.friendList[userName]};
			//return {"friend":[{"name":"you","lastMessage":"hello","timestamp":"00:00"},{"name":"jacky","lastMessage":"bye","timestamp":"20:48"}],"group":[]};
		},
		chatFriend: function(userName, friendName) {
			var tmp = [userName, friendName].sort();
			return tmp[0]+tmp[1];
		}
	}
};