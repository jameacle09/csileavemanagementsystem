import React, { Component } from 'react';
import { Card, Button, CardTitle, Row, Col } from 'reactstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <Row>
                    <Col xs="6" sm="4">
                        <Card body inverse color="primary">
                            <CardTitle>Apply Leave</CardTitle>
                            <Button color="secondary">Submit</Button>
                        </Card>
                    </Col>
                    <Col xs="6" sm="4">
                        <Card body inverse color="success">
                            <CardTitle>My Leave History</CardTitle>
                            <Button color="secondary">View</Button>
                        </Card>
                    </Col>
                    <Col xs="6" sm="4">
                        <Card body inverse color="info">
                            <CardTitle>My Leave Details</CardTitle>
                            <Button color="secondary">View</Button>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="6" sm="4">
                        <Card body inverse color="danger">
                            <CardTitle>My Profile</CardTitle>
                            <Button color="secondary">View</Button>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Dashboard;