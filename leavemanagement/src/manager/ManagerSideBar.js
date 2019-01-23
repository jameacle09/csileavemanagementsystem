import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../common/Styles.css"

class ManagerSideBar extends Component {

    render() {
        return (
            <div className="main_sidebar">
                <ul>
                    <li><Link to="/managerapproval">Manager Approval</Link></li>
                    <li><Link to="/staffleavehistory">Leave History</Link></li>
                    <li><Link to="#">Report</Link></li>
                </ul>
            </div>
        )
    }
}

export default ManagerSideBar;