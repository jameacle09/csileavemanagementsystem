import React, { Component } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import SideBar from '../hradmin/SideBar';
import "../common/Styles.css"

class LeaveEntitlement extends Component {

    render() {
        const headerStyle = {
            margin: "0 0 0 10px"
        };

        const divStyle = {
            background: "#B8E2FC",
            width: "auto",
            margin: "0 0 0 0",
            padding: "25px 0 25px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div className="menuContainer">
                <Row className="menu">
                    <Col md="2">
                        <SideBar />
                    </Col>
                    <Col md="10" className="content">
                        <div style={divStyle}>
                            <span className="header"><h3 style={headerStyle}>Leave Entitlement</h3></span>
                        </div><br />
                        <div className="content">
                            <div style={{ textAlign: "right" }}>
                                <Button className="btn btn-primary" color="primary">Upload Entitlement</Button><br /><br />
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
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LeaveEntitlement;