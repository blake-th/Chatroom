$(function() {
	$('#add-friend-btn').on('click', function() {
		var groupName = $('input[name="groupName"]').val();
		var action = 'addGroup';

		var request = {
			groupName: groupName,
			action: action,
			friendList: groupName
		};

		$.post(window.location.href, request).done(function(response) {
			window.location.replace(response.nextUrl);
			alert(response.message);
		});
	});

	$('#add-group-btn').on('click', function() {
		var groupName = $('input[name="groupName"]').val();
		var action = 'addGroup';

		var friendList = prompt('invite:');
		friendList = friendList.split(' ').join(',');

		var request = {
			groupName: groupName,
			action: action,
			friendList: friendList
		};

		$.post(window.location.href, request).done(function(response) {
			window.location.replace(response.nextUrl);
			alert(response.message);
		});
	});

	$('.friend-item').on('click', function() {
		var groupName = $(this).find('form .name').html();

		var submitForm = $(this).find('form');
		var action = $('<input>').attr('type', 'hidden').attr('name', 'action').val('chatGroup');
		var group = $('<input>').attr('type', 'hidden').attr('name', 'groupName').val(groupName);
		var friendList = $('<input>').attr('type', 'hidden').attr('name', 'friendList').val(groupName);

		submitForm.append($(group));
		submitForm.append($(action));
		submitForm.append($(friendList));
		submitForm.submit();
	});
});