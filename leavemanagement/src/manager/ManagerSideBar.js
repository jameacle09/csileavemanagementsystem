import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';

class ManagerSideBar extends Component {

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
                    <ListGroupItem tag={Link} to="/managerapproval" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Manager Approval</ListGroupItem>
                    <ListGroupItem tag={Link} to="/staffleavehistory" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Leave History</ListGroupItem>
                    <ListGroupItem tag={Link} to="#" activeclassname="active" style={{ backgroundColor: 'powderblue' }} >Report</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}

export default ManagerSideBar;