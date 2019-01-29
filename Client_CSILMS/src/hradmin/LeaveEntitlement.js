import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
// import SideBar from "../hradmin/SideBar";
import "../common/Styles.css";

class LeaveEntitlement extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave Entitlement</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <div style={{ textAlign: "right" }}>
            <Button className="btn btn-primary" color="primary">
              <span className="fa fa-upload"></span> Upload Entitlement
            </Button>
            <br />
            <br />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>CSI Staff ID</th>
                <th>Staff Name</th>
                <th>Leave Year</th>
                <th>Leave Type</th>
                <th>Carried Forward</th>
                <th>Entitlement</th>
                <th>Available Leave</th>
                <th>Taken Leave</th>
                <th>Balance Leave</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td>
                  <Button
                    color="primary"
                    tag={Link}
                    to="/editentitlement"
                    activeclassname="active"
                  >
                    <span className="fa fa-edit"></span>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default LeaveEntitlement;
