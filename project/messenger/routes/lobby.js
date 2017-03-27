var express = require('express');
var router = express.Router();
var path = require('path');

var lobbyAction = require('../util/lobbyAction.js');

router.use(express.static(path.resolve('public')));
/* GET home page. */
router.get('/:userName', function(req, res, next) {
	console.log(path.resolve('public'));
  res.render('lobby');
});

router.post('/:userName', function(req, res, next) {
		console.log(req.body);
		var {friendName, action} = req.body;
		lobbyAction[action](friendName);
		console.log(req.originalUrl);
		res.redirect(req.originalUrl);
});

module.exports = router;
