var express = require('express');
var router = express.Router();

var chatroom = require('./chatroom.js');
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
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


/*var express = require('express');
var router = express.Router();

var chatroom = require('./chatroom.js');
var path = require('path');
//var loginAction = require('../util/loginAction.js');



//router.use('/chatroom', chatroom);


router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var {userName, password, action} = req.body;
	
	var response = {
		'message': req.app.loginAction[action](userName, password),
		'url': req.originalUrl
	};

	switch (response.message) {
		case 'not register':
		case 'wrong password':
		case 'name used':
		case 'register successful':
			res.json(response);
			break;
			//res.redirect(req.originalUrl);
		case 'login successful':
			//console.log(req.baseUrl);
			response.url = path.resolve('/lobby', userName);
			//console.log(response.url);
			res.json(response);
			//res.redirect('/lobby/'+userName);
	}

	//console.log(userName);
	//console.log(password);
});

module.exports = router;
*/