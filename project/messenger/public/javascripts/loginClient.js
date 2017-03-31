$(function() {

	function clickAction(action) {
		var userName = $('input[name="userName"]').val();
		var password = $('input[name="password"]').val();
		var action = action;

		var request = {
			userName: userName,
			password: password,
			action: action
		};

		$.post(window.location.href, request).done(function(response) {
			window.location.replace(response.nextUrl);
			alert(response.message);
		});
	}

	$('#login-btn').on('click', function(event) {
		clickAction('checkLogin');
	});

	$('#register-btn').on('click', function() {
		clickAction('checkRegister');
	});
});

/*$(function() {
	$('#login-btn').on('click', function(event) {
		//console.log('DEBUGGING!!!!!!');
		//console.log(document);
		//console.log(window);
//		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('checkLogin');

//		$('#loginInfo').append($(action));
//		$('#loginInfo').submit();

		var userName = $('input[name="userName"]').val();
		var password = $('input[name="password"]').val();
		var action = 'checkLogin';

		$.post(window.location.href, {
			'userName': userName,
			'password': password,
			'action': action
		}).done(function(res) {
			window.location.replace(res.url);
			alert(res.message);

		});
		//var dbg2 = document.getElementById('test');

		//console.log(dbg);
		//console.log(dbg === dbg2);
		//dbg2.submit(function(e) {alert('Handler called..'); e.preventDefault();});
		//document.location.href='http://localhost:3000/chatroom';
	});

	$('#register-btn').on('click', function() {
	//	var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('checkRegister');

	//	$('#loginInfo').append($(action));
	//	$('#loginInfo').submit();
		var userName = $('input[name="userName"]').val();
		var password = $('input[name="password"]').val();
		var action = 'checkRegister';

		$.post(window.location.href, {
			'userName': userName,
			'password': password,
			'action': action
		}).done(function(res) {
			window.location.replace(res.url);
			alert(res.message);
		});


	});
});*/