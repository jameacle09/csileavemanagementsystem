import React, { Component } from "react";
import { Table } from "reactstrap";
// import ManagerSideBar from "./ManagerSideBar";
import "../common/Styles.css";

class ManagerApproval extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">View Leave Request</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>Empl ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Leave Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.props.data.map((staffprofile, index) => (
                <StaffTableRow key={index} staffprofile={staffprofile} />
              ))} */}

              <tr>
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

export default ManagerApproval;
