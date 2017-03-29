$(function() {
	$('#add-friend-btn').on('click', function() {
//		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('addFriend');

//		$('#add-friend-info').append($(action));
//		$('#add-friend-info').submit();
		
//		var userName = $('input[name="userName"]').val();
		var friendName = $('input[name="friendName"]').val();
		var action = 'addFriend';

		$.post(window.location.href, {
			'friendName': friendName,
			'action': action
		}).done(function(res) {
			window.location.replace(res.url);
			alert(res.message);
		});

	});

	$('.friend-item').on('click', function() {
		var friendName = $(this).find('form .name').html();

		var submitForm = $(this).find('form');
		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('chatFriend');
		var friend = $('<input>').attr('type', 'hidden').attr('name', 'friendName').val(friendName);

		submitForm.append($(friend));
		submitForm.append($(action));
		submitForm.submit();


	});
});