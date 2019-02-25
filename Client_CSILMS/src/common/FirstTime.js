import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Forbidden.css';
import { ACCESS_TOKEN, FIRST_TIME } from '../constants';

class FirstTime extends Component {
    render() {
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return <Redirect to="/login" />
        }

        if(!localStorage.getItem(FIRST_TIME)){
            return <Redirect to="/" />
        }

        return (
            <div className="page-not-found">
                <h3 className="title">
                    
                </h3>
                <div className="desc">
                Your password has been reset. Click OK button to change new password.
                </div>
                <Link to="/changepassword"><Button className="go-back-btn" type="primary" size="large">OK</Button></Link>
            </div>
        );
    }
}

export default withRouter(FirstTime);