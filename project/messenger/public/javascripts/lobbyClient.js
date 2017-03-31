$(function() {
	$('#add-friend-btn').on('click', function() {
		var groupName = $('input[name="groupName"]').val();
		var action = 'addGroup';

		var request = {
			groupName: groupName,
			action: action,
			friendList: groupName
		};

		//var requestJson = JSON.stringify(request);
		//console.log('DEBBBBUG', requestJson);

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
		//alert(friendList);

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

/*$(function() {
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
});*/