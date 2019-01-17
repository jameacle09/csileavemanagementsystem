import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';
import ManagerSideBar from './ManagerSideBar'

class StaffLeaveHistory extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div>
                <Row>
                    <Col><ManagerSideBar /></Col>
                    <Col>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>Leave History</h3></Col>
                    </Row>
                </div>
                <br />
                <div className="container">
                    <Table bordered responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Leave Type</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>                                
                                <td>-</td>
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

export default StaffLeaveHistory;