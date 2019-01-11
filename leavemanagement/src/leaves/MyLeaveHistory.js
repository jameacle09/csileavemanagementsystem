import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";

class MyLeaveHistory extends Component {
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
    );
  }
}

export default MyLeaveHistory;