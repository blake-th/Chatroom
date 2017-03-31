module.exports = function(app) {
	return {
		app: app,
		addGroup: function(userName, groupName, friendList) {
			//console.log(friendList);
			// check all names register
			console.log('ADDGROUPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
			console.log('USERNAME: ', userName);
			console.log('GROUPNAME: ', groupName);
			console.log('FRIENDLIST: ', friendList);


			var nameNotExist = false;
			var app = this.app;

			friendList.forEach(function(friendName, index, array) {
				console.log('FOREACH: ', friendName);
				if (!(friendName in app.register))
					nameNotExist = true;
			});
			if (nameNotExist)
				return 'name not found';
			
			// append group name
			friendList.push(userName);
			friendList.sort();
			//var notGroup = (friendList.length === 2);
			var notGroup = (friendList.indexOf(groupName) !== -1);
			var hashGroupName = (notGroup) ? groupName : groupName+'--'+friendList.join('-');

			// check if group exist
			var groups = app.messageList[userName];
			if (hashGroupName in groups)
				return 'added already';

			//groups[userName] = {};
			
			var date = new Date;
			//var message = ;

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
					//app.messageList[from][hashGroupName] = [];
					//var messages = app.messageList[friendName][hashGroupName];
					//var to = (notGroup) ? friendName : hashGroupName;
					//console.log('TTOOOOOOOOOOOOO', to);
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

/*module.exports = function(app) {
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
};*/