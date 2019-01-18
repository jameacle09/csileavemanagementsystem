import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import "./SideBarStyle.css";

class SideBar extends Component {

    render() {
        return (
            <div className="sidebar">
                <ListGroup
                    style={{
                        backgroundColor: 'lightskyblue',
                        width: 250,
                        fontFamily: "Helvetica",
                        fontSize: "1.1rem",
                        height: '200vh'
                    }}>
                    <ListGroupItem tag={Link} to="/liststaffprofile" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Staff Profile</ListGroupItem>
                    <ListGroupItem tag={Link} to="/leaveentitlement" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Leave Entitlement</ListGroupItem>
                    <ListGroupItem tag={Link} to="/publicholiday" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Public Holiday</ListGroupItem>
                    <ListGroupItem tag={Link} to="/leavecategory" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Leave Category</ListGroupItem>
                    <ListGroupItem tag={Link} to="#" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Report</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

export default SideBar;