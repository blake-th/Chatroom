var express = require('express');
var router = express.Router();
var chatroom = require('./chatroom.js');
var path = require('path');

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', function(req, res, next) {
	var {userName, password, action} = req.body;
	
	var response = {
		message: req.app.loginAction[action](userName, password),
		nextUrl: req.originalUrl
	};

	switch (response.message) {
		case 'not register':
		case 'wrong password':
		case 'name used':
		case 'register successful':
			res.json(response);
			break;
		case 'login successful':
			response.nextUrl = path.resolve('/lobby', userName);
			res.json(response);
			break;
	}
});

module.exports = router;