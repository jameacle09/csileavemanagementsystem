import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";
import "./MyProfile.css";

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
            .then(data => this.setState({ userData: data }))
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
                this.setState({ userData: userData })
            })
    }

    render() {
        /*
        const divStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        };

        const divStyleFlex = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            margin: "10px",
            width: "40%",
            height: "40%"
        };

        const loadingText = {color: "blue", textAlign: "center", fontFamily: "Arial Black"};
        const dataText = {color: "blue"};

        const containerFlex = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            display: "flex",
            flexFlow: "row" || "wrap",
            justifyContent: "flexStart"
        };
        */

        if (this.state.userData == null) {
            // display loading screen until data is available
            return (
                <div>
                    <br />
                    <div className="container">
                        <ListGroup className="divStyle">
                            <ListGroupItem color="primary">My Profile</ListGroupItem>
                            <ListGroupItem><h2 className="loadingText"> Loading </h2></ListGroupItem>
                        </ListGroup>
                        <br />
                    </div>
                    <br />
                </div>
            );
        }


        let userData = this.state.userData;

        // reformat dates and retrive manager name ONLY when data fetch successfully
        if( userData['csiStaffId'] !== '') {
            let joinDate = new Date(this.state.userData['joinDate']);
            userData['joinDate'] = joinDate.getFullYear() + "-" + (joinDate.getMonth() + 1) + "-" + joinDate.getDate();
            userData['managerName'] = this.state.userData['lineManager']['staffName'];
        }

        return (
            <div>
                <div className="nameContainerFlex">
                    <div className="staffNameContainer">
                        <div className="listStaffName">{userData['staffName']}</div>
                    </div>
                    <div className="mainListContainer">
                        <ul className="mainList">
                            <li>CSI Staff ID <p className="mainDataText">{userData['csiStaffId']}</p></li>
                            <li>Job Title <p className="mainDataText">{userData['jobTitle']}</p></li>
                        </ul>
                    </div>
                </div>
                <div className="containerFlex">
                    <ListGroup className="ListGroupStyleFlex">
                        <ListGroupItem color="primary">My Profile</ListGroupItem>
                        <ListGroupItem>CSI Staff ID: <p className="dataText">{userData['csiStaffId']}</p></ListGroupItem>
                        <ListGroupItem>Name: <p className="dataText">{userData['staffName']}</p></ListGroupItem>
                        <ListGroupItem>NRIC / Passport No: <p className="dataText">{userData['icNumber']}</p></ListGroupItem>
                    </ListGroup>
                    <ListGroup className="ListGroupStyleFlex">
                        <ListGroupItem color="primary">Business</ListGroupItem>
                        <ListGroupItem>Business Unit: <p className="dataText">{userData['businessUnit']}</p></ListGroupItem>
                        <ListGroupItem>Line Manager: <p className="dataText">{userData['managerName']}</p></ListGroupItem>
                        <ListGroupItem>Join Date: <p className="dataText">{userData['joinDate']}</p></ListGroupItem>
                    </ListGroup>
                    <ListGroup className="ListGroupStyleFlex">
                        <ListGroupItem color="primary">Contact</ListGroupItem>
                        <ListGroupItem>Email: <p className="dataText">{userData['email']}</p></ListGroupItem>
                        <ListGroupItem>Mobile No.: <p className="dataText">{userData['mobileNo']}</p></ListGroupItem>
                    </ListGroup>
                </div>
                <br />
                <div className="buttonChngPwd">
                    <Button color="primary" tag={Link} to="/changepassword" activeclassname="active">Change Password</Button>
                </div>
                <br />
            </div>
        );


    }
}

export default MyProfile;