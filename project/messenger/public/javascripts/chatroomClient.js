$(function () {

  var [from, to] = window.location.pathname.split('/').slice(-1)[0].split('-');
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
//    $('.list-group').append($('<li class="list-group-item">').text(msg));
//    window.scrollTo(0, document.body.scrollHeight);
/*console.log(msg);
var messageContainer = $('<div class="message-container">');
      messageContainer.append($('<h5>').text(msg.content));
      messageContainer.append($('<h6>').text(msg.timestamp));
      if (msg.from === from)
        messageContainer.addClass('text-right');
      var listItem = $('<li class="list-group-item">').append(messageContainer);
      $('.list-group').append(listItem);
      window.scrollTo(0, document.body.scrollHeight);*/
      displayMessage.call(msg);
  });



});