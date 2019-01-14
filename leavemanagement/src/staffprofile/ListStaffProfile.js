import React, { Component } from 'react';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";

class ListStaffProfile extends Component {
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
        const spacing = {
            padding: "10px",
            textAlign: "right"
        }

        const divStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        const loadingText = { color: "blue", textAlign: "center", fontFamily: "Arial Black" };
        const dataText = { color: "blue" };


        if (this.state.userData == null) {
            // display loading screen until data is available

            return (
                <div>
                    <br />
                    <div className="container">
                        <ListGroup style={divStyle}>
                            <ListGroupItem color="primary">Staff Profile</ListGroupItem>
                            <ListGroupItem><h2 style={loadingText}> Loading </h2></ListGroupItem>
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
        if (userData['csiStaffId'] != '') {
            let joinDate = new Date(this.state.userData['joinDate']);
            userData['joinDate'] = joinDate.getFullYear() + "-" + (joinDate.getMonth() + 1) + "-" + joinDate.getDate();
            userData['managerName'] = this.state.userData['lineManager']['staffName'];
        }

        return (
            <div className="container">
                <div style={spacing}>
                    <Button className="btn btn-primary" color="primary" tag={Link} to="/newstaffprofile" activeclassname="active">Add New Employee</Button>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>CSI Staff ID</th>
                            <th>Staff Name</th>
                            <th>Email</th>
                            <th>IC No./ Passport No.</th>
                            <th>Job Title</th>
                            <th>Mobile No.</th>
                            <th>Business Unit</th>
                            <th>Line Manager</th>
                            <th>Join Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userData['csiStaffId']}</td>
                            <td>{userData['staffName']}</td>
                            <td>{userData['email']}</td>
                            <td>{userData['icNumber']}</td>
                            <td>{userData['jobTitle']}</td>
                            <td>{userData['mobileNo']}</td>
                            <td>{userData['businessUnit']}</td>
                            <td>{userData['managerName']}</td>
                            <td>{userData['joinDate']}</td>
                            <td><Button color="primary"><span>Edit</span></Button></td>
                            <td><Button color="primary"><span>Delete</span></Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListStaffProfile;