
module.exports = function(app) {
	return {
		app: app,
		checkLogin: function(userName, password) {
			if (!(userName in this.app.register))
				return 'not register';
			if (this.app.register[userName] !== password)
				return 'wrong password';
			return 'login successful';
		//console.log('login: ', this.login)
	},
	checkRegister: function(userName, password) {
		if (userName in this.app.register)
			return 'name used';
		this.app.register[userName] = password;
		this.app.friendList[userName] = [];
		//console.log('register: ', this.app.register);

		return 'register successful';
	}
}
};