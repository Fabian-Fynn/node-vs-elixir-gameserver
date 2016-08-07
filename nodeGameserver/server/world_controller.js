const worldController = {
  globalState: {
    currentId: 0,
    fieldSize: 200,
    nodes: [],
    timeout: 5000,
    timeoutCheckDelay: 500
  },
  
  spawnNode: function() {
    const node = {
      id: this.globalState.currentId,
      position: this.randomPosition(),
      size: 1,
      lastRequest: Date.now()
    };

    this.globalState.currentId++;
    this.globalState.nodes.push(node);

    setTimeout(() => {
      this.checkTimeout(node);
    }, this.globalState.timeoutCheckDelay);

    return node;
  },
  
  randomPosition: function() {
    let position;

    do {
      position = { x: this.ranInt(0, this.globalState.fieldSize), y: this.ranInt(0, this.globalState.fieldSize) };
    } while (this.isOccupied(position));

    return position;
  },
  
  isOccupied: function(vector) {
    for (let i in this.globalState.nodes) {
      if (this.globalState.nodes[i].position.x === vector.x && this.globalState.nodes[i].position.y === vector.y) {
        console.log('occupied');
        return true;
      }
    }
    return false;
  },
  
  getWorldPartial: function(node) {
    let visibleNodes = [];

    for (let i in this.globalState.nodes) {
      if (this.isInRange(this.globalState.nodes[i], node) && this.globalState.nodes[i].id !== node.id) {
        visibleNodes.push(this.globalState.nodes[i]);
      }
    }
    return { otherNodes: visibleNodes, self: node };
  },
  
  isInRange: function(otherNode, currentNode) {
    //Aspect ratio 16:9
    let horizontalRange = currentNode.size * 160 / 2;
    let verticalRange = currentNode.size * 90 / 2;

    let horizontalDistance = Math.abs(otherNode.position.x - currentNode.position.x) - otherNode.size / 2;
    let verticalDistance = Math.abs(otherNode.position.y - currentNode.position.y) - otherNode.size / 2;

    return (horizontalDistance < horizontalRange && verticalDistance < verticalRange);
  },

  checkTimeout: function(node) {
    if (Date.now() - node.lastRequest > this.globalState.timeout) {
      for (let i in this.globalState.nodes) {
        if ( this.globalState.nodes[i].id === node.id ) {
          this.globalState.nodes.splice(i, 1);
          return;
        }
      }
    }
    setTimeout(() => {
      this.checkTimeout(node);
    }, this.globalState.timeoutCheckDelay);
  },
  
  ranInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = worldController;
