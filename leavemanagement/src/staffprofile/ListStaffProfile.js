import React, { Component } from 'react';
import { Table, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import StaffTableRow from './StaffTableRow';
import { Link } from "react-router-dom";
import SideBar from '../hradmin/SideBar';
import "../hradmin/SideBarStyle.css";

class ListStaffProfile extends Component {

    render() {
        const spacing = {
            padding: "10px",
            textAlign: "right"
        }

        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div>
                <div className="containerFlex_">
                    <ListGroup className="ListGroupSideBar">
                        <SideBar />
                    </ListGroup>
                    <ListGroup className="ListGroupContent">
                        <div>
                            <br /><br />
                            <div className="container" style={divStyle}>
                                <Row>
                                    <Col><h3>Staff Profile</h3></Col>
                                </Row>
                            </div>
                            <br />
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
                                            <th>NRIC / Passport No.</th>
                                            <th>Job Title</th>
                                            <th>Mobile No.</th>
                                            <th>Business Unit</th>
                                            <th>Line Manager</th>
                                            <th>Join Date</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td><Button color="primary" tag={Link} to="#" activeclassname="active">Edit</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            </div>
                    </ListGroup>
                </div>
                </div>
                );
            }
        }
        
export default ListStaffProfile;