var socket = io();

socket.on('world_update', function(worldPartial) {
  displayWorldPartial(worldPartial);
  setTimeout(function(){
    socket.emit('world_refresh');
  }, 100);
});

function displayWorldPartial(partial) {
  console.log(partial)
  $('#partial').html("<b>You:</b><br>");
  $('#partial').append(JSON.stringify(partial.self));
  $('#partial').append("<br><br><b>Other Nodes:</b><br>");
  for (let n in partial.otherNodes) {
    $('#partial').append(JSON.stringify(partial.otherNodes[n]));
    $('#partial').append("<br>");
  }
}

socket.emit('world_refresh', $.now());
