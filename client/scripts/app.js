var displayMessages = function(url){
  $.ajax({
    // always use this url
    url: url,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      data = JSON.parse(data);
      appendMessage(data);
      getUniqueRooms(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var sendMessages = function(url, message){
  $.ajax({
    // always use this url
    url: url,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('msg sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var friends = {};
var appendMessage = function(data) {
  $('.messages').html('');
  _.each(data.results, function(message) {
    var $username = $('<span class="username"></span>');
    $username.text(message.username);

    var $usermessage = $('<span class="usermessage"></span>');
    if(message.text) {
      message.text = message.text.slice(0, 2000);
    }
    $usermessage.text(message.text);


    var $message = $('<div class="message"></div>');
    $message.append($username);
    $message.append($('<span>: </span>'));
    $message.append($usermessage);
    if(message.username in friends) {
      $message.addClass('friend');
    }

    $('.messages').append($message);
  });
};

var refreshMessages = function(){
  var url = 'http://127.0.0.1:8080/1/classes/chatterbox/?order=-createdAt&limit=500';
  var room = $('#chooseRoom').val();
  if(room !== 'All Rooms') {
    url += '&where={"roomname":"'+room+'"}';
  }
  displayMessages(url);
};

var rooms = {};
var getUniqueRooms = function(data) {
  _.each(data.results, function(message) {
    if(!(message.roomname in rooms)) {
      rooms[message.roomname] = message.roomname;
      $room = $('<option></option>');
      $room.text(message.roomname);
      $('#chooseRoom').append($room);
    }
  });

  return rooms;
};

$(document).ready(function(){
  refreshMessages();
  setInterval(refreshMessages, 1000);


  $('#composeMsgButton').on('click', function(event) {
    var text = $(this).text();

    if (text === "Hide Compose Message") {
      text = 'Compose Message';
      $('#composeMsgBody').hide('slide');
    } else{
      text = "Hide Compose Message";
      $('#composeMsgBody').show('slide');
    }
    $(this).text(text);
  });

  $('#sendMsgButton').on('click', function(event) {
    var $usermessage = $('#txtUsermsg');
    var message = {
      username: $('#txtUsername').val(),
      text: $usermessage.val(),
      roomname: $('#chooseRoom').val()
    };
    if(message.roomname === 'All Rooms') {
      message.roomname = 'Lobby';
    }

    $usermessage.val('');
    sendMessages('http://127.0.0.1:8080/1/classes/chatterbox/', message);
  });

  $('#chooseRoom').on('change', function(){
    refreshMessages();
  });

  $('#addNewRoomButton').on('click', function(){
    console.log($(this).text());
    if($(this).text() === 'Add New Room') {
      $('#addNewRoomBody').show('hidden');
      $(this).text('Save New Room');
    } else {
      var roomname = $('#txtNewRoom').val();
      if(roomname !== '') {
        $('#chooseRoom').append('<option selected>'+roomname+'</option>');
      }
      $('#addNewRoomBody').hide('slide');
      $(this).text('Add New Room');
    }
  });

  $('.messages').on('click', '.username', function(){
    $(this).parent().addClass('friend');
    var username = $(this).text();
    friends[username] = username;
    $('.username').each(function(i, node) {
      if($(node).text() === username) {
        $(node).parent().addClass('friend');
      }
    });
  });
});
