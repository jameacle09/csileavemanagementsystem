import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class MyLeaveSummary extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div className="container" style={divStyle}>
                <Row>
                    <Col><h5>Annual Leave Balance: 23 Days</h5></Col>
                </Row>
                <br />
                <Row>
                    <Col><h5>Medical Leave Balance: 14 Days</h5></Col>
                </Row>
            </div>
        );
    }
}

export default MyLeaveSummary;