var EventEmitter = require('events').EventEmitter;
var game = new EventEmitter();
module.exports = game;

var questionPairs = [
    [`What might you name your first child?`, `What is the name of your pet (or your favorite pet name)?`],
    [`Who is your biggest role model?`, `Who is the last person you talked to?`],
    [`Who is your favorite superhero?`, `Give your instructor a nickname!`]
];

var questionPairIndex = 0;

game.sendOutNewQuestions = function () {

    game.emit('newQuestions', questionPairs[questionPairIndex]);

    if (questionPairIndex + 1 === questionPairs.length) {
        questionPairIndex = 0;
    } else {
        questionPairIndex = questionPairIndex + 1;
    }

};

game.newResponse = response => game.emit('newResponse', response);
game.playerJoined = () => game.emit('playerJoined');
game.playerLeft = () => game.emit('playerLeft');
