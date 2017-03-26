var express = require('express');
var router = express.Router();

var chatroom = require('./chatroom.js');
var checkUser = require('../util/checkUser.js');



//router.use('/chatroom', chatroom);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var {userName, password, status} = req.body;
	if (checkUser[status](userName, password))
		res.redirect('../chatroom');
	else
		res.redirect(req.baseUrl);
	//console.log(userName);
	//console.log(password);
});





module.exports = router;
