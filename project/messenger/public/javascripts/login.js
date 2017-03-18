$(function() {
	$('#login-btn').on('click', function() {
		console.log('DEBUGGING!!!!!!');
		console.log(document);
		console.log(window);
		document.location.href='http://localhost:3000/chatroom';
	})
});