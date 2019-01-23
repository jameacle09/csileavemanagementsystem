import React, { Component } from 'react';
import { Table, Row, Col } from 'reactstrap';

class MyLeaveDetails extends Component {
  render() {

    const divStyle = {
        background: "#B8E2FC",
        width: "auto",
        margin: "auto",
        padding: "15px 0 15px 0",
        borderRadius: "5px",
        align: "center",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    };

    const headerStyle = {
      margin: "0 0 0 10px"
    };

    return (
      <div>
        <br />
        <div className="container" style={divStyle}>
        <span><h3 style={headerStyle}>My Leave Details</h3></span>
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