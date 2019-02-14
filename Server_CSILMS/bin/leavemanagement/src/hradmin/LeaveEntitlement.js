import React, { Component } from 'react';
import { Table, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";
import SideBar from './SideBar';
import "./SideBarStyle.css";

class LeaveEntitlement extends Component {

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
                                        <Col><h3>Leave Entitlement</h3></Col>
                                    </Row>
                                </div>
                                <br />
                                <div className="container">
                                    <div style={spacing}>
                                        <Button className="btn btn-primary" color="primary">Upload Entitlement</Button>
                                    </div>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>CSI Staff ID</th>
                                                <th>Staff Name</th>
                                                <th>Leave Year</th>
                                                <th>Leave Type</th>
                                                <th>Carried Forward</th>
                                                <th>Entitlement</th>
                                                <th>Available Leave</th>
                                                <th>Taken Leave</th>
                                                <th>Balance Leave</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td><Button color="primary" tag={Link} to="/editentitlement" activeclassname="active"><span>Edit</span></Button></td>
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

export default LeaveEntitlement;