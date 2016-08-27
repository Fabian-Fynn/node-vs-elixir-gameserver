const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const connHandler = require('./server/connection_handler.js');
const worldController = require('./server/world_controller.js');

app.use("", express.static(__dirname + '/client'));
//app.use('', express.static(path.join(__dirname, 'client')));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});


io.on('connection', function(socket) {
  console.log('connection');
  connHandler(socket, worldController);
});

http.listen(3000, function(){
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:3000');
});
