var React  = require('react');
var ReactDOM  = require('react-dom');

var Skya = React.createClass({
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-fixed-top sera-header">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-square fa-stack-2x logo"></i>
                                    <strong className="fa-stack-1x fa-stack-text fa-comment-text ">S</strong>
                                </span>
                                &nbsp;skya</a>
                        </div>
                    </div>
                </nav>
                Her kommer innhold
            </div>
        )
    }
});

ReactDOM.render(<Skya />, document.getElementById("content"));
