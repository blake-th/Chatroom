$(function () {
  var [userName, groupName] = window.location.pathname.split('/').slice(-1)[0].split('---');
  var notGroup = (groupName.indexOf('--') === -1);
  var roomName = (notGroup) ? [userName, groupName].sort().join('-') : groupName;
  var socket = io();

  function displayMessage() {
    var messageContainer = $('<div class="message-container">');
    messageContainer.append($('<h2>').text(this.from+':'));
    messageContainer.append($('<h4>').text(this.content));
    messageContainer.append($('<h6>').text(this.timestamp));

    var listItem = $('<li class="list-group-item">');
    if (this.from === userName) {
      messageContainer.addClass('text-right');
      messageContainer.addClass('bg-info text-white');
    }

    listItem.append(messageContainer);
    $('.list-group').append(listItem);

    window.scrollTo(0, document.body.scrollHeight);
  }

  socket.on('connect', function() {
    socket.emit('connectTo', {
      roomName: roomName,
      from: userName,
      to: groupName
    });
  });
  
  $('form').submit(function(){
    var content = $('#message').val();

    if (!$.trim(content))
      return false;

    socket.emit('chat message', {
      roomName: roomName,
      from: userName,
      to: groupName,
      content: content
    });

    $('#message').val('');
    return false;
  });

  socket.on('old message', function(msg) {
    $(msg).each(displayMessage);
  });

  socket.on('chat message', function(msg){
    displayMessage.call(msg);
  });
});