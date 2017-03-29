//var fs = require('fs');

//var register = {};
//var login = {};

module.exports = {
	register: {},
	login: {},
	checkLogin: function(userName, password) {
		if (!(userName in this.register)) {
			console.log('WTFFF?');
			return 'not register';
		}
		if (this.register[userName] !== password) {
			console.log('FFFTWWW?');
			return 'wrong password';
		}
		return 'login successful';
		console.log('login: ', this.login)
	},
	checkRegister: function(userName, password) {
		if (userName in this.register)
			return 'name used';

		this.register[userName] = password;
		console.log('register: ', this.register);

		return 'register successful';
	}
};