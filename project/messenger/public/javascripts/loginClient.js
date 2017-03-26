$(function() {
	$('#login-btn').on('click', function() {
		//console.log('DEBUGGING!!!!!!');
		//console.log(document);
		//console.log(window);
		var status = $('<input>').attr('type', 'hidden').attr('name', 'status').val('login');

		$('#loginInfo').append($(status));
		$('#loginInfo').submit();
		//var dbg2 = document.getElementById('test');

		//console.log(dbg);
		//console.log(dbg === dbg2);
		//dbg2.submit(function(e) {alert('Handler called..'); e.preventDefault();});
		//document.location.href='http://localhost:3000/chatroom';
	});

	$('#register-btn').on('click', function() {
		var status = $('<input>').attr('type', 'hidden').attr('name', 'status').val('register');

		$('#loginInfo').append($(status));
		$('#loginInfo').submit();
	});
});