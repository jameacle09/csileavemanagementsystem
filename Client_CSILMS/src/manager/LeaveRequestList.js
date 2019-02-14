import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isManagerRole } from "../util/APIUtils";

class LeaveRequestList extends Component {
  render() {
    // if (!isManagerRole(this.props.currentUser)) {
    //   return <Redirect to="/forbidden" />;
    // }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave Request List</h3>
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
                <th>Half Day</th>
                <th>Duration</th>
                <th>Leave Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((leaveRequest, index) => (
                <tr key={index}>
                  <td>{this.props.leaveRequest.employeeDetails.emplId}</td>
                  <td>{this.props.leaveRequest.employeeDetails.name}</td>
                  <td>{this.props.leaveRequest.leaveCategory.leaveDescr}</td>
                  <td>{this.props.leaveRequest.halfDay}</td>
                  <td>{this.props.leaveRequest.leaveDuration} day/s</td>
                  <td>{this.props.leaveRequest.leaveCategory.active}</td>
                  <td>
                    <Button
                      component={Link}
                      variant="contained"
                      color="primary"
                      tag={Link}
                      to={`/leaverequest/view/${
                        this.props.employeeDetails.emplId
                      }`}
                      activeclassname="active"
                      style={{ textTransform: "none", color: "white" }}
                    >
                      <span
                        className="fa fa-edit"
                        style={{ textTransform: "none", color: "white" }}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default LeaveRequestList;
