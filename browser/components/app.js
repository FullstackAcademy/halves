var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Question = require('./question');
var Response = require('./response');
var ControlPanel = require('./control-panel');

const FIRST_COLOR = 'rgba(256, 0, 0, 0.3)';
const SECOND_COLOR = 'rgba(0, 0, 256, 0.3)';

var socket = require('../socket-connection');

var App = React.createClass({
    getInitialState() {
        return {
            questions: [],
            responses: [],
            showAssociations: false,
            showQuestions: false
        };
    },
    setNewQuestions(questions) {
        this.setState({
            questions,
            responses: [],
            showAssociations: false,
            showQuestions: false
        });
    },
    addResponse(response) {
        this.setState({
            responses: this.state.responses.concat([response])
        });
    },
    reveal() {
        this.setState({
            showAssociations: true
        });
    },
    showQuestion() {
        if (this.state.showQuestions === false) {
            this.setState({
                showQuestions: 1
            });
        } else if (this.state.showQuestions === 1) {
            this.setState({
                showQuestions: 2
            });
        }
    },
    getRevealColor(response) {
        if (!this.state.showAssociations) return null;
        return this.state.questions.indexOf(response.question) === 0 ? FIRST_COLOR : SECOND_COLOR;
    },
    getResponses() {

        var responses = this.state.responses;

        if (!responses.length) return null;

        var responseElements = responses.map((r, index) => {
            return <Response key={index} responseText={r.text} revealColor={this.getRevealColor(r)} />
        });

        return (
            <div id="responses-container">
                <ReactCSSTransitionGroup transitionName="fadeIn">
                    {responseElements}
                </ReactCSSTransitionGroup>
            </div>
        );

    },
    getQuestions() {

        var questions = this.state.questions;

        if (!questions.length || !this.state.showQuestions) return null;

        var questionElements = questions.slice(0, this.state.showQuestions).map((q, index) => {
            return <Question text={q} color={index === 0 ? 'red' : 'blue'} />;
        });

        return <div id="questions-container">{questionElements}</div>;

    },
    componentDidMount() {

        socket.on('connect', () => {
            socket.on('newQuestions', this.setNewQuestions);
            socket.on('newResponse', this.addResponse);
            socket.on('revealAssociations', this.reveal);
            socket.on('showQuestion', this.showQuestion);
        });

    },
    render() {
        return (
            <main id="app">
                {this.getQuestions()}
                {this.getResponses()}
                <ControlPanel />
            </main>
        );
    }
});

module.exports = App;