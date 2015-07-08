var io = require('socket.io-client');
var socket = io(window.location.origin);
module.exports = socket;