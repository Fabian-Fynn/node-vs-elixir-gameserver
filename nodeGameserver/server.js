const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use("", express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

var connHandler = require('./server/connectionHandler.js');

io.on('connection', function(socket) {
  console.log('connection');
  connHandler(socket);
});

http.listen(3000, function(){
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:3000');
});
