var express = require('express');
var router = express.Router();

var chatroom = require('./chatroom.js');
var loginAction = require('../util/loginAction.js');



//router.use('/chatroom', chatroom);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var {userName, password, action} = req.body;
	
	if (loginAction[action](userName, password))
		res.redirect('/lobby/'+userName);
	else
		res.redirect(req.originalUrl);
	//console.log(userName);
	//console.log(password);
});





module.exports = router;
