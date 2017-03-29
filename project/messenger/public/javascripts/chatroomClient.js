$(function () {
  var socket = io();

  $('form').submit(function(){
    socket.emit('chat message', $('#message').val());
    $('#message').val('');
    return false;
  });

  socket.on('system message', function(msg) {
    console.log(msg);
  });

  socket.on('chat message', function(msg){
    $('.list-group').append($('<li class="list-group-item">').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });


});