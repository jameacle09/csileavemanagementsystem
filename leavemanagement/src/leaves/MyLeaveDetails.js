import React, { Component } from 'react';
import { Table } from 'reactstrap';

class MyLeaveDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
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
    );
  }
}

export default MyLeaveDetails;