import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";

class MyProfile extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container">
                <ListGroup>
                    <ListGroupItem color="primary">My Profile</ListGroupItem>
                    <ListGroupItem>CSI Staff ID: <p></p></ListGroupItem>
                    <ListGroupItem>Name: <p>Shahrul Ridzuan Aliyas</p></ListGroupItem>
                    <ListGroupItem>Email: </ListGroupItem>
                    <ListGroupItem>IC No./ Passport No.: </ListGroupItem>
                    <ListGroupItem>Job Title: </ListGroupItem>
                    <ListGroupItem>Mobile No.: </ListGroupItem>
                    <ListGroupItem>Business Unit: </ListGroupItem>
                    <ListGroupItem>Line Manager: </ListGroupItem>
                    <ListGroupItem>Join Date: </ListGroupItem>
                </ListGroup>
                <br />
                <Button color="primary" tag={Link} to="/changepassword" activeclassname="active">Change Password</Button>
            </div>
        );


    }
}

export default MyProfile;