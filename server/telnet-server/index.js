var _ = require('lodash');
var net = require('net');
const PORT = 8124
var server = net.createServer().listen(PORT, () => console.log(`Telnet server on port ${PORT}`));
var game = require('../game');

var lineBreak = '\r\n';
var connectionPool = [];

server.on('connection', function (socket) {

    connectionPool.push(socket);
    game.playerJoined();

    socket.write(`${lineBreak}Welcome to the game!${lineBreak}Awaiting next question . . .`);

    const kickPlayer = () => {
        connectionPool = _.without(connectionPool, socket);
        game.playerLeft();
    }

    socket.on('end', kickPlayer);
    socket.on('error', kickPlayer)

});


game.on('newQuestions', (questionPair) => {

    var getQuestion = ((pair) => {

        var lastUsedIndex = 1;

        return () => {
            if (lastUsedIndex === 0) {
                lastUsedIndex = 1;
                return pair[1];
            } else {
                lastUsedIndex = 0;
                return pair[0];
            }
        }

    })(questionPair);

    connectionPool.forEach(socket => {

        var chosenQuestion = getQuestion();

        socket.write(`${lineBreak.repeat(2)}${chosenQuestion}${lineBreak.repeat(2)}`);

        var responseListener = data => {
            game.newResponse({ text: data.toString(), question: chosenQuestion });
            socket.write(`${lineBreak.repeat(2)}Thanks for your response! Awaiting next question . . .`);
            socket.removeListener('data', responseListener);
        };

        socket.on('data', responseListener);

    });

});


