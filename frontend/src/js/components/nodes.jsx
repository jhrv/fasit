var React = require('react')
var Link = require('react-router').Link

module.exports = Nodes = React.createClass({

    fetchNodes: function(){
        return [{"hostname": "node1.domain.com"},
                {"hostname": "node2.domain.com"},
                {"hostname": "node3.domain.com"}]
    },
    
    render: function(){
        return (
                <ul>
                    {this.fetchNodes().map(function(node){return <li key={node.hostname}><Link to={"/nodes/" + node.hostname}>{node.hostname}</Link></li>})}
                </ul>
    )}
});


