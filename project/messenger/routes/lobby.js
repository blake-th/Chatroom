var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.static(path.resolve('public')));

router.get('/:userName', function(req, res, next) {
	var userName = req.params.userName;
  res.render('lobby', req.app.lobbyAction['getGroupList'](userName));
});

router.post('/:userName', function(req, res, next) {
		var userName = req.params.userName;
		var {groupName, action, friendList} = req.body;
		friendList = friendList.split(',');
		//var friendList = [req.body['friendList[]']];

		//console.log('REQ BODY:', req);
		//console.log('PARSE:', JSON.parse(req.body));
		console.log('FRIENDLIST:', friendList);

		var response = {
			'message': req.app.lobbyAction[action](userName, groupName, friendList),
			'nextUrl': req.originalUrl
		};

		switch (response.message) {
			case 'added already':
			case 'add successful':
			case 'name not found':
				res.json(response);
				break;
			default:
				res.redirect(path.resolve('/chatroom', response.message));
		}
});

/*router.post('/:userName', function(req, res, next) {
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
			case 'user not found':
				res.json(response);
				break;
			default:
				res.redirect(path.resolve('/chatroom', response.message));
			//res.redirect('/chatroom/'+req.params.userName+friendName);
		
			//res.redirect(req.originalUrl);
		}
});*/
module.exports = router;
