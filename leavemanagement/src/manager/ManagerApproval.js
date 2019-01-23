import React, { Component } from 'react';
import { Table, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import ManagerSideBar from './ManagerSideBar';

class ManagerApproval extends Component {
    render() {
        const divStyle = {
            background: "#B8E2FC",
            width: "auto",
            margin: "0 0 0 10px",
            padding: "15px 0 15px 0",
            borderRadius: "5px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        const headerStyle = {
            margin: "0 0 0 10px"
        };
        
        return (
            <div>
                <div className="containerFlex_">
                    <ListGroup className="ListGroupSideBar">
                            <ManagerSideBar />
                    </ListGroup>
                    <ListGroup className="ListGroupContent">
                            <div>
                                <br /><br />
                                <div className="container" style={divStyle}>
                                    <span><h3 style={headerStyle}>View Leave Request</h3></span>
                                </div>
                                <br />
                                <div className="container">
                                    <Table bordered responsive>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Leave Type</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
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

export default ManagerApproval;