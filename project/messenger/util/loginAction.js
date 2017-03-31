module.exports = function(app) {
	return {
		app: app,
		checkLogin: function(userName, password) {
			if (!(userName in this.app.register))
				return 'not register';

			if (this.app.register[userName] !== password)
				return 'wrong password';

			return 'login successful';
	},
	checkRegister: function(userName, password) {
		if (userName in this.app.register)
			return 'name used';

		this.app.register[userName] = password;
		var groupList = this.app.messageList[userName] = {};
		groupList[userName] = [{
				from: userName,
				to: userName,
				content: 'Hi!',
				timestamp: new Date
		}];
		return 'register successful';
	}
}
};

/*

module.exports = function(app) {
	return {
		app: app,
		checkLogin: function(userName, password) {
			if (!(userName in this.app.register))
				return 'not register';
			if (this.app.register[userName] !== password)
				return 'wrong password';
			return 'login successful';
	},
	checkRegister: function(userName, password) {
		if (userName in this.app.register)
			return 'name used';
		
		this.app.register[userName] = password;
		this.app.friendList[userName] = [userName];
		this.app.oldMessage[userName+'-'+userName] = [{
			from: userName,
			to: userName,
			content: 'Hi~',
			timestamp: new Date
		}];
		//console.log('register: ', this.app.register);

		return 'register successful';
	}
}
};*/