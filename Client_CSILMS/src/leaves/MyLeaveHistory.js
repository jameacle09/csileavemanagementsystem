import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";

class MyLeaveHistory extends Component {
  render() {
    return (
      <div className="mainContainerLeavePages">
        <div className="subContainerLeavePages">
          <div className="headerContainerFlex">
            <span>
              <h3 className="headerStyle">My Leave History</h3>
            </span>
          </div>
          <br />
          <div className="tableContainerFlex">
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
      </div>
    );
  }
}

export default MyLeaveHistory;
