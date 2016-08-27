const socket = io();

socket.on('world_update', function(msg) {
  displayWorldPartial(msg);
  setTimeout(function(){
    socket.emit('world_refresh', $.now());
  }, 100);
});

function displayWorldPartial(msg) {
  const partial = msg.worldPartial;
  const resp_time = Date.now() - msg.req_time;

  $('#partial').html(`Current Response time: ${resp_time}ms<br>`);
  $('#partial').append("<b>You:</b><br>");
  $('#partial').append(JSON.stringify(partial.self));
  $('#partial').append("<br><br><b>Other Nodes:</b><br>");
  for (let n in partial.otherNodes) {
    $('#partial').append(JSON.stringify(partial.otherNodes[n]));
    $('#partial').append("<br>");
  }
}

socket.emit('world_refresh', $.now());

