import React, { Component } from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class LeaveCategory extends Component {
    constructor(props) {
        super(props);

    }

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
                        <Col><h3>List of Leave Category</h3></Col>
                    </Row>
                </div>
                <br />
                <div className="container">
                    <div style={spacing}>
                        <Button className="btn btn-primary" color="primary" tag={Link} to="/addleavecategory" activeclassname="active">Add New</Button>
                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Leave Code</th>
                                <th>Description</th>
                                <th>Entitlement</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><Button color="primary"><span>Edit</span></Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        );
    }
}

export default LeaveCategory;