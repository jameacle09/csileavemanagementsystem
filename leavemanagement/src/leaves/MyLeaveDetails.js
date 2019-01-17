import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';

class MyLeaveDetails extends Component {
  render() {
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
            <Col><h3>My Leave Details</h3></Col>
          </Row>
        </div>
        <br />
        <div className="container">
          <Table bordered responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Leave Type</th>
                <th>Entitlement</th>
                <th>Carry Forward</th>
                <th>Available</th>
                <th>Taken</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default MyLeaveDetails;