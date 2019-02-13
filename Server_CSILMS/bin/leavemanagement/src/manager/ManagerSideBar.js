import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';
import "../hradmin/SideBarStyle.css";

class ManagerSideBar extends Component {

    render() {
        return (
            <div>
                <ListGroup className="sidebar" style={{ height: '200vh' }}>
                    <ListGroupItem tag={Link} to="/managerapproval" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Manager Approval</ListGroupItem>
                    <ListGroupItem tag={Link} to="/staffleavehistory" activeclassname="active" style={{ backgroundColor: 'lightskyblue' }} >Leave History</ListGroupItem>
                    <ListGroupItem tag={Link} to="#" activeclassname="active" style={{ backgroundColor: 'lightskyblue   ' }} >Report</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

export default ManagerSideBar;