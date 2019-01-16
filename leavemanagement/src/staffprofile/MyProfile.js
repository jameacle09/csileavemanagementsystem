import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";

class MyProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userData: null
        };
    }

    componentDidMount() {
        // fetch data from API    
        fetch('http://localhost/api/staffprofile/1')
        .then(response => response.json())
        .then(data => this.setState({userData: data}))
        .catch(err => {
            // if unable to fetch data, assign default (spaces) to values
            let userData = {
                'csiStaffId': '',
                'staffName': '',
                'email': '',
                'icNumber': '',
                'jobTitle': '',
                'mobileNo': '',
                'businessUnit': '',
                'managerName': '',
                'joinDate': ''
            }
            this.setState({userData: userData})
        })             
    }
    
    render() {

        const divStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        const loadingText = {color: "blue", textAlign: "center", fontFamily: "Arial Black"};
        const dataText = {color: "blue"};


        if(this.state.userData == null) {   
            // display loading screen until data is available
            return (
                <div>
                    <br />
                    <div className="container">
                        <ListGroup style={ divStyle }>
                            <ListGroupItem color="primary">My Profile</ListGroupItem>
                            <ListGroupItem><h2 style={ loadingText }> Loading </h2></ListGroupItem>
                        </ListGroup>
                        <br />
                        <Button color="primary" tag={Link} to="/changepassword" activeclassname="active">Change Password</Button>
                    </div>
                    <br />
                </div>
            );
        }
          
        
        let userData = this.state.userData;

        // reformat dates and retrive manager name ONLY when data fetch successfully
        if( userData['csiStaffId'] !== '') {
            let joinDate = new Date(this.state.userData['joinDate']);
            userData['joinDate'] = joinDate.getFullYear() + "-" + (joinDate.getMonth() +1) + "-" + joinDate.getDate();          
            userData['managerName'] = this.state.userData['lineManager']['staffName'];
        }
        
        return (
            <div>
                <br />
                <div className="container">
                    <ListGroup style={ divStyle }>
                        <ListGroupItem color="primary">My Profile</ListGroupItem>
                        <ListGroupItem>CSI Staff ID: <p style={ dataText }>{userData['csiStaffId']}</p></ListGroupItem>
                        <ListGroupItem>Name: <p style={ dataText }>{userData['staffName']}</p></ListGroupItem>
                        <ListGroupItem>Email: <p style={ dataText }>{userData['email']}</p></ListGroupItem>
                        <ListGroupItem>NRIC / Passport No.: <p style={ dataText }>{userData['icNumber']}</p></ListGroupItem>
                        <ListGroupItem>Job Title: <p style={ dataText }>{userData['jobTitle']}</p></ListGroupItem>
                        <ListGroupItem>Mobile No.: <p style={ dataText }>{userData['mobileNo']}</p></ListGroupItem>
                        <ListGroupItem>Business Unit: <p style={ dataText }>{userData['businessUnit']}</p></ListGroupItem>
                        <ListGroupItem>Line Manager: <p style={ dataText }>{userData['managerName']}</p></ListGroupItem>
                        <ListGroupItem>Join Date: <p style={ dataText }>{userData['joinDate']}</p></ListGroupItem>
                    </ListGroup>
                    <br />
                    <Button color="primary" tag={Link} to="/changepassword" activeclassname="active">Change Password</Button>
                </div>
                <br />
            </div>
        );


    }
}

export default MyProfile;