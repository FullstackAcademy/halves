var React = require('react');

module.exports = React.createClass({
    getDefaultProps() {
        return {
            revealColor: null
        };
    },
    getStyle() {
        if (!this.props.revealColor) return {};
        return {
            backgroundColor: this.props.revealColor
        };
    },
    render() {
        return (
            <h2 className="response" style={this.getStyle()}>{this.props.responseText}</h2>
        );
    }
});