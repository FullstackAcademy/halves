var React = require('react');

module.exports = React.createClass({
    getColor() {
        return {
            color: this.props.color
        };
    },
    render() {
        return (
            <h1 style={this.getColor()} className="question">
                {this.props.text}
            </h1>
        );
    }
});