$(function () {

  var [userName, groupName] = window.location.pathname.split('/').slice(-1)[0].split('---');
  var notGroup = (groupName.indexOf('--') === -1);
  //var roomName = (notGroup) ? userName+'-'+groupName : groupName;
  var roomName = (notGroup) ? [userName, groupName].sort().join('-') : groupName;

  console.log('USERNAME: ', userName);
  console.log('GROUPNAME: ', groupName);
  console.log('ROOMNAME: ', roomName);

  function displayMessage() {
    var messageContainer = $('<div class="message-container">');
      messageContainer.append($('<h5>').text(this.content));
      messageContainer.append($('<h6>').text(this.timestamp));
      if (this.from === userName)
        messageContainer.addClass('text-right');
      var listItem = $('<li class="list-group-item">').append(messageContainer);
      $('.list-group').append(listItem);
      window.scrollTo(0, document.body.scrollHeight);
  }

  var socket = io();

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

  socket.on('system message', function(msg) {
    console.log(msg);
  });

  socket.on('old message', function(msg) {
    console.log(msg);
    $(msg).each(displayMessage);
  });

  socket.on('chat message', function(msg){

      displayMessage.call(msg);
  });
});


/*$(function () {

  var [userName, groupName] = window.location.pathname.split('/').slice(-1)[0].split('---');
  var [name1, name2] = [from, to].sort();
  var roomName = name1+'-'+name2;
  //var to = roomName.split('-')[1];
  console.log(from, '-', to);

  function displayMessage() {
    var messageContainer = $('<div class="message-container">');
      messageContainer.append($('<h5>').text(this.content));
      messageContainer.append($('<h6>').text(this.timestamp));
      if (this.from === from)
        messageContainer.addClass('text-right');
      var listItem = $('<li class="list-group-item">').append(messageContainer);
      $('.list-group').append(listItem);
      window.scrollTo(0, document.body.scrollHeight);
  }


  var socket = io();

  socket.on('connect', function() {
    socket.emit('connectTo', {'roomName': roomName});
  });
  

  $('form').submit(function(){
    var content = $('#message').val();
    if (!content)
      return false;
    socket.emit('chat message', {
      'roomName': roomName,
      'from': from,
      'to': to,
      'content': content
    });
    $('#message').val('');
    return false;
  });

  socket.on('system message', function(msg) {
    console.log(msg);
  });

  socket.on('old message', function(msg) {
    $(msg).each(displayMessage);
    //console.log(msg);
  });

  socket.on('chat message', function(msg){

      displayMessage.call(msg);
  });
});*/