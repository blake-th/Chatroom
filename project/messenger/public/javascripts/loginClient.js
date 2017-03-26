$(function() {
	$('#login-btn').on('click', function() {
		//console.log('DEBUGGING!!!!!!');
		//console.log(document);
		//console.log(window);
		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('checkLogin');

		$('#loginInfo').append($(action));
		$('#loginInfo').submit();
		//var dbg2 = document.getElementById('test');

		//console.log(dbg);
		//console.log(dbg === dbg2);
		//dbg2.submit(function(e) {alert('Handler called..'); e.preventDefault();});
		//document.location.href='http://localhost:3000/chatroom';
	});

	$('#register-btn').on('click', function() {
		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('checkRegister');

		$('#loginInfo').append($(action));
		$('#loginInfo').submit();
	});
});