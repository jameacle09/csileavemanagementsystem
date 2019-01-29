import React, { Component } from "react";
import { Table } from "reactstrap";

class MyLeaveHistory extends Component {
  render() {
    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave History</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
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
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default MyLeaveHistory;
