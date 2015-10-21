var React = require('react')

module.exports = Node = React.createClass({
    render: function(){
        return (
                <h1>{this.props.params.node}</h1>
        )}
})
