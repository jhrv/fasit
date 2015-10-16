var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var createBrowserHistory = require('history/lib/createBrowserHistory')

var App = React.createClass({
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-fixed-top sera-header">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-square fa-stack-2x logo"></i>
                                    <strong className="fa-stack-1x fa-stack-text fa-comment-text ">F</strong>
                                </span>
                                &nbsp;<strong>fasit</strong>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/applications">applications</Link></li>
                                <li><Link to="/environments">environments</Link></li>
                                <li><Link to="/resources">resources</Link></li>
                                <li><Link to="/nodes">nodes</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

var Nodes = React.createClass({

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

var Node = React.createClass({
    render: function(){
        return (
                <h1>{this.props.params.node}</h1>
        )}
})

var Applications = React.createClass({
    render: function(){
        return (
                <h1>Here be applications</h1>
        )}
})

var Environments = React.createClass({
    render: function(){
        return (
                <h1>Here be dragons</h1>
        )}
})

var Resources = React.createClass({
    render: function(){
        return (
                <h1>Here be .... r e s o u r c e</h1>
        )}
})
    
ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <Route path="/nodes" component={Nodes} />
            <Route path="/nodes/:node" component={Node} />
            <Route path="/applications" component={Applications} />
            <Route path="/environments" component={Environments} />
            <Route path="/resources" component={Resources} />
        </Route>
    </Router>), document.getElementById("content"));
