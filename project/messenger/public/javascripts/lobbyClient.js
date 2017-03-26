$(function() {
	$('#add-friend-btn').on('click', function() {
		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('addFriend');

		$('#add-friend-info').append($(action));
		$('#add-friend-info').submit();
	});
});