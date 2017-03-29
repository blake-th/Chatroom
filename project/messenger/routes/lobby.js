var express = require('express');
var router = express.Router();
var path = require('path');

//var lobbyAction = require('../util/lobbyAction.js');
var friendList = require('../data/friendList/admin.json');

router.use(express.static(path.resolve('public')));
/* GET home page. */
router.get('/:userName', function(req, res, next) {
	//console.log(path.resolve('public'));
  res.render('lobby', friendList);
  //console.log(friendList);
});

router.post('/:userName', function(req, res, next) {
		console.log(req.body);
		//console.log(friendList);
		var {friendName, action} = req.body;

		if (req.app.lobbyAction[action](friendName))
			res.redirect('/chatroom/'+req.params.userName+friendName);
		else
			res.redirect(req.originalUrl);
});

module.exports = router;
