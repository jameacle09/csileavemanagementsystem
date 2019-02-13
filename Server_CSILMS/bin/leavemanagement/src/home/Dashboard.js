import React, { Component } from 'react';
import { Card, Button, CardTitle, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class Dashboard extends Component {

    render() {
        const cardStyle = {
            background: "#357BB6",
            fontFamily: 'Helvetica'
          };
        return (
            <div className="container">
                <Row>
                    <Col>
                        <Card body inverse style={cardStyle}>
                            <CardTitle>Apply Leave</CardTitle>
                            <Button color="secondary" tag={Link} to="/applyleave">Submit</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse style={cardStyle}>
                            <CardTitle>My Leave History</CardTitle>
                            <Button color="secondary" tag={Link} to="/myleavehistory">View</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse style={cardStyle}>
                            <CardTitle>My Leave Details</CardTitle>
                            <Button color="secondary" tag={Link} to="/myleavedetails">View</Button>
                        </Card>
                    </Col>
                    <br />
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card body inverse style={cardStyle}>
                            <CardTitle>My Profile</CardTitle>
                            <Button color="secondary" tag={Link} to="/myprofile">View</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse style={cardStyle}>
                            <CardTitle>Manager Approval</CardTitle>
                            <Button color="secondary" tag={Link} to="/managerapproval">View</Button>
                        </Card>
                    </Col>
                    <br />
                    <Col>
                        <Card body inverse style={cardStyle}>
                            <CardTitle>HR Dashboard</CardTitle>
                            <Button color="secondary" tag={Link} to="/liststaffprofile">View</Button>
                        </Card>
                    </Col>
                    <br />
                </Row>
                <br />
            </div>

        );
    }
}

export default Dashboard;