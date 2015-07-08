var React = require('react');
var socket = require('../socket-connection');

module.exports = React.createClass({
    getInitialState() {
        return {
            numPlayers: 0
        };
    },
    componentDidMount() {
        socket.on('connect', () => {
            socket.on('playerJoined', this.addPlayer);
            socket.on('playerLeft', this.removePlayer);
        });
    },
    addPlayer() {
        this.setState({
            numPlayers: this.state.numPlayers + 1
        });
    },
    removePlayer() {
        this.setState({
            numPlayers: this.state.numPlayers - 1
        });
    },
    newQuestions() {
        socket.emit('letsSeeSomeNewQuestions');
    },
    revealQuestion() {
        socket.emit('showQuestion');
    },
    revealAssociations() {
        socket.emit('revealAssociations');
    },
    render() {
        return (
            <div id="control-panel">
                <h2>{this.state.numPlayers} players connected.</h2>
                <button onClick={this.newQuestions}>Start New Questions</button>
                <button onClick={this.revealQuestion}>Reveal Question</button>
                <button onClick={this.revealAssociations}>Reveal Response Associations</button>
            </div>
        );
    }
});