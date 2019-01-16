import React, { Component } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

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
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>List of Leave Entitlement</h3></Col>
                    </Row>
                </div>
                <br />
                <div className="container">
                    <div style={spacing}>
                        <Button className="btn btn-primary" color="primary" tag={Link} to="/addnewleave" activeclassname="active">Add New</Button>
                    </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>CSI Staff ID</th>
                                <th>Staff Name</th>
                                <th>Leave Year</th>
                                <th>Leave Code</th>
                                <th>Carried Forward</th>
                                <th>Entitlement</th>
                                <th>Available Leave</th>
                                <th>Taken Leave</th>
                                <th>Balance Leave</th>
                                <th>Edit</th>
                                <th>Delete</th>
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
                                <td><Button color="primary"><span>Edit</span></Button></td>
                                <td><Button color="primary"><span>Delete</span></Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default LeaveEntitlement;