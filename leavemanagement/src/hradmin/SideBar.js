import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';

class SideBar extends Component {

    render() {
        return (
            <div>
                <ListGroup
                    style={{
                        backgroundColor: 'powderblue',
                        width: 250,
                        fontFamily: "Helvetica",
                        fontSize: "1.1rem",
                        height: '200vh'
                    }}>
                    <ListGroupItem tag={Link} to="/liststaffprofile" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Staff Profile</ListGroupItem>
                    <ListGroupItem tag={Link} to="/leaveentitlement" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Leave Entitlement</ListGroupItem>
                    <ListGroupItem tag={Link} to="/publicholiday" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Public Holiday</ListGroupItem>
                    <ListGroupItem tag={Link} to="/leavecategory" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Leave Category</ListGroupItem>
                    <ListGroupItem tag={Link} to="#" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Report</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

export default SideBar;