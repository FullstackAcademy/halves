var path = require('path');
var server = require('http').createServer();
var express = require('express');
var app = express();
var socketio = require('socket.io');
var netServer = require('./telnet-server');
var game = require('./game');

server.listen(1237, () => console.log('Server started.'));
server.on('request', app);

var io = socketio(server);

io.on('connection', (socket) => {

    socket.on('letsSeeSomeNewQuestions', game.sendOutNewQuestions);
    socket.on('showQuestion', () => socket.emit('showQuestion'));
    socket.on('revealAssociations', () => socket.emit('revealAssociations'));

    game.on('newQuestions', questions => socket.emit('newQuestions', questions));
    game.on('newResponse', r => socket.emit('newResponse', r));
    game.on('playerJoined', () => socket.emit('playerJoined'));
    game.on('playerLeft', () => socket.emit('playerLeft'));

});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

