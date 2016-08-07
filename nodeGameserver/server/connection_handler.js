var initializeHandlers = function(socket, worldController) {
  let node = worldController.spawnNode();
  socket.emit('node_update', node);

  socket.on('node_refresh', function() {
    node.lastRequest = Date.now();
    socket.emit('node_update', node);
  });

  socket.on('world_refresh', function() {
    let worldPartial = worldController.getWorldPartial(node);
    node.lastRequest = Date.now();
    socket.emit('world_update', worldPartial);
  });

}

module.exports = initializeHandlers;
