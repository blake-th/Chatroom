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
			break;
	}
});

module.exports = router;