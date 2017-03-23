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
	var {userName, password} = req.body;
	if (checkUser(userName, password))
		res.redirect('../chatroom');
	//console.log(userName);
	//console.log(password);
});





module.exports = router;
