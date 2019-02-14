import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Forbidden.css';

class Forbidden extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    403
                </h1>
                <div className="desc">
                You don’t have permission to access this resource.
                </div>
                <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>
            </div>
        );
    }
}

export default withRouter(Forbidden);