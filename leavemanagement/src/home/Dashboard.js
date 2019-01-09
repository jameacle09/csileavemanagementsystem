import React, { Component } from 'react';
import { Card, Button, CardTitle, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <Row>
                    <Col>
                        <Card body inverse color="primary">
                            <CardTitle>Apply Leave</CardTitle>
                            <Button color="secondary" tag={Link} to="/applyleave">Submit</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse color="success">
                            <CardTitle>My Leave History</CardTitle>
                            <Button color="secondary" tag={Link} to="/myleavehistory">View</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse color="info">
                            <CardTitle>My Leave Details</CardTitle>
                            <Button color="secondary" tag={Link} to="/myleavedetails">View</Button>
                        </Card>
                    </Col>
                    <br />
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card body inverse color="danger">
                            <CardTitle>My Profile</CardTitle>
                            <Button color="secondary" tag={Link} to="/myprofile">View</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse color="warning">
                            <CardTitle>Manager Approval</CardTitle>
                            <Button color="secondary" tag={Link} to="/managerapproval">View</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse color="dark">
                            <CardTitle>HR Dashboard</CardTitle>
                            <Button color="secondary" tag={Link} to="/hrdashboard">View</Button>
                        </Card>
                    </Col>
                    <br />
                </Row>
            </div>

        );
    }
}

export default Dashboard;