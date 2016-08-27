var initializeHandlers = function(socket, worldController) {
  let node = worldController.spawnNode();
  socket.emit('node_update', node);

  socket.on('node_refresh', function(timestamp) {
    node.lastRequest = Date.now();
    socket.emit('node_update', {node: node, req_time: timestamp});
  });

  socket.on('world_refresh', function(timestamp) {
    let worldPartial = worldController.getWorldPartial(node);
    node.lastRequest = Date.now();
    socket.emit('world_update', {worldPartial: worldPartial, req_time: timestamp});
  });

}

module.exports = initializeHandlers;
