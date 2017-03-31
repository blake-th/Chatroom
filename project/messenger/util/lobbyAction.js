module.exports = function(app) {
	return {
		app: app,
		addGroup: function(userName, groupName, friendList) {		
			var app = this.app;
			var nameNotExist = false;
			friendList.forEach(function(friendName, index, array) {
				console.log('FOREACH: ', friendName);
				if (!(friendName in app.register))
					nameNotExist = true;
			});
			if (nameNotExist)
				return 'name not found';
			
			friendList.push(userName);
			friendList.sort();

			var notGroup = (friendList.indexOf(groupName) !== -1);
			var hashGroupName = (notGroup) ? groupName : groupName+'--'+friendList.join('-');


			var groups = app.messageList[userName];
			if (hashGroupName in groups)
				return 'added already';
			
			var date = new Date;

			if (notGroup) {
				app.messageList[userName][hashGroupName] = [{
					from: hashGroupName,
					to: userName,
					content: 'Hi!',
					timestamp: date
				}];
				app.messageList[hashGroupName][userName] = [{
					from: userName,
					to: hashGroupName,
					content: 'Hi!',
					timestamp: date
				}];
				return 'add successful';
			}

			friendList.forEach(function(userName, index, array) {
				var messages = app.messageList[userName][hashGroupName] = [];
				friendList.forEach(function(friendName, index, array) {
					messages.push({
						from: friendName,
						to: hashGroupName,
						content: 'Hi!',
						timestamp: date
					});
				});
			});
			return 'add successful';
		},
		getGroupList: function(userName) {
			var app = this.app;
			return {groups: Object.keys(app.messageList[userName])};
		},
		chatGroup: function(userName, groupName) {
			return userName+'---'+groupName;
		}
	}
};