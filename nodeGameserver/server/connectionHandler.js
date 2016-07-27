var globalState = {
  currentId: 0,
  fieldSize: 200,
  nodes: [],
  timeout: 5000,
  timeoutCheckDelay: 500
}

var initializeHandlers = function(socket) {
  let node = spawnNode();
  socket.emit('node_update', node);

  socket.on('node_refresh', function() {
    node.lastRequest = Date.now();
    socket.emit('node_update', node);
  });

  socket.on('world_refresh', function() {
    let worldPartial = getWorldPartial(node);
    node.lastRequest = Date.now();
    console.log('refresh please');
    socket.emit('world_update', worldPartial);
  });

  socket.on('test_ping', function(time) {
    node.lastRequest = Date.now();
    globalState.counter += 1;
    socket.emit('test_pong', {time: time, n: node});
  });
}

function spawnNode() {
  const node = {
    id: globalState.currentId,
    position: randomPosition(),
    size: 1,
    lastRequest: Date.now()
  };

  globalState.currentId++;
  globalState.nodes.push(node);

  setTimeout(() => {
    checkTimeout(node);
  }, globalState.timeoutCheckDelay);

  return node;
}

function checkTimeout(node) {
  if (Date.now() - node.lastRequest > globalState.timeout) {
    for (let i in globalState.nodes) {
      if ( globalState.nodes[i].id === node.id ) {
        globalState.nodes.splice(i, 1);
        return;
      }
    }
  }

  setTimeout(() => {
    checkTimeout(node);
  }, globalState.timeoutCheckDelay);
}

function getWorldPartial(node) {
  let visibleNodes = [];

  for (let i in globalState.nodes) {
    if (isInRange(globalState.nodes[i], node) && globalState.nodes[i].id !== node.id) {
      visibleNodes.push(globalState.nodes[i]);
    }
  }

  return { otherNodes: visibleNodes, self: node };
}

function isInRange(otherNode, currentNode) {
  //Aspect ratio 16:9
  let horizontalRange = currentNode.size * 160 / 2;
  let verticalRange = currentNode.size * 90 / 2;

  let horizontalDistance = Math.abs(otherNode.position.x - currentNode.position.x) - otherNode.size / 2;
  let verticalDistance = Math.abs(otherNode.position.y - currentNode.position.y) - otherNode.size / 2;

  return (horizontalDistance < horizontalRange && verticalDistance < verticalRange);
}

function randomPosition() {
  let position;

  do {
    position = { x: ranInt(0, globalState.fieldSize), y: ranInt(0, globalState.fieldSize) };
  } while (isOccupied(position));

  return position;
}

function isOccupied(vector) {
  for (let i in globalState.nodes) {
    if (globalState.nodes[i].position.x === vector.x && globalState.nodes[i].position.y === vector.y) {
      console.log('occupied');
      return true;
    }
  }
  return false;
}

function ranInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = initializeHandlers
