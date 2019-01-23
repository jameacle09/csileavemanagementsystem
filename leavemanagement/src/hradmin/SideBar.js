import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../common/Styles.css"

class SideBar extends Component {

    render() {
        return (
            <div className="main_sidebar">
                <ul>
                    <li><Link to="/liststaffprofile">Staff Profile</Link></li>
                    <li><Link to="/leaveentitlement">Leave Entitlement</Link></li>
                    <li><Link to="/publicholiday">Public Holiday</Link></li>
                    <li><Link to="/leavecategory">Leave Category</Link></li>
                    <li><Link to="#">Report</Link></li>
                </ul>
            </div>
        )
    }
}

export default SideBar;