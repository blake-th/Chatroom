var express = require('express');
var router = express.Router();
var path = require('path');

//var lobbyAction = require('../util/lobbyAction.js');
//var friendList = require('../data/friendList/admin.json');

router.use(express.static(path.resolve('public')));
/* GET home page. */
router.get('/:userName', function(req, res, next) {
	//console.log(path.resolve('public'));
  res.render('lobby', req.app.lobbyAction['getFriendList'](req.params.userName));
  //console.log(friendList);
});

router.post('/:userName', function(req, res, next) {
		console.log(req.body);
		//console.log(friendList);
		var userName = req.params.userName;
		var {friendName, action} = req.body;

		var response = {
			'message': req.app.lobbyAction[action](userName, friendName),
			'url': req.originalUrl
		};
		switch (response.message) {
			case 'friend already':
			case 'add successful':
				res.json(response);
				break;
			default:
				res.redirect(path.resolve('/chatroom', response.message));
			//res.redirect('/chatroom/'+req.params.userName+friendName);
		
			//res.redirect(req.originalUrl);
		}
});

module.exports = router;
