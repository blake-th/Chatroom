$(function () {

  var [from, to] = window.location.pathname.split('/').slice(-1)[0].split('-');
  var [name1, name2] = [from, to].sort();
  var roomName = name1+'-'+name2;
  //var to = roomName.split('-')[1];
  console.log(from, '-', to);
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
    $(msg).each(function() {
      $('.list-group').append($('<li class="list-group-item">').text(this.content));
    });
    //console.log(msg);
  });

  socket.on('chat message', function(msg){
    $('.list-group').append($('<li class="list-group-item">').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });


});