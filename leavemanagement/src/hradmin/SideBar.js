import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import './SideBarStyle.css';

class SideBar extends Component {

    render() {
        const SideBarStyle = {
            color: "#FFFFFF",
            height: "100vh",
            width: "200px",
            fontSize: "1.3rem",
            background: "#357BB6",
            fontFamily: "Helvetica"
        }

        return (
            <div className="side-menu">
                <ListGroup>
                    <ListGroupItem tag={Link} to="/liststaffprofile" activeclassname="active">Staff Profile</ListGroupItem>
                    <ListGroupItem tag={Link} to="/leaveentitlement" activeclassname="active">Leave Entitlement</ListGroupItem>
                    <ListGroupItem tag={Link} to="/publicholiday" activeclassname="active">Public Holiday</ListGroupItem>
                    <ListGroupItem tag={Link} to="/leavecategory" activeclassname="active">Leave Category</ListGroupItem>
                    <ListGroupItem tag={Link} to="/hrdashboard" activeclassname="active">Report</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

export default SideBar;