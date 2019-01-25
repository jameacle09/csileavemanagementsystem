import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";

class MyLeaveDetails extends Component {
  render() {
    return (
      <div className="mainContainerLeavePages">
        <div className="subContainerLeavePages">
          <div className="headerContainerFlex">
            <span>
              <h3 className="headerStyle">My Leave Details</h3>
            </span>
          </div>
          <br />
          <div className="tableContainerFlex">
            <Table responsive>
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
      </div>
    );
  }
}

export default MyLeaveDetails;
