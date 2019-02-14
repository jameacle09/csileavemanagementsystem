import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';

class MyLeaveHistory extends Component {
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
            <Col><h3>My Leave History</h3></Col>
          </Row>
        </div>
        <br />
        <div className="container">
          <Table bordered responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
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

export default MyLeaveHistory;