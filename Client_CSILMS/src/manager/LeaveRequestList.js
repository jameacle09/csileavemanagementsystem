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
    console.log(this.props);

    // let date =
    //   leaveRequest.id.startDate.getDate() +
    //   "-" +
    //   parseInt(leaveRequest.id.startDate.getMonth() + 1) +
    //   "-" +
    //   leaveRequest.id.startDate.getFullYear();
    const formatDate = strDate => {
      // return strDate.subString(1, 10);
      // return strDate;
      var d = new Date(strDate),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("-");
    };

    const showFullString = strHalfDay => {
      if (strHalfDay === "Y") {
        return "Yes";
      } else {
        return "No";
      }
    };
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
                <th>Start Date</th>
                <th>End Date</th>
                <th>Leave Type</th>
                <th>Half Day</th>
                <th>Duration</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((leaveRequest, index) => (
                <tr key={index}>
                  <td>{leaveRequest.id.emplid}</td>
                  <td>{leaveRequest.employeeDetails.name}</td>
                  <td>{formatDate(leaveRequest.id.startDate)}</td>
                  <td>{formatDate(leaveRequest.endDate)}</td>
                  <td>{leaveRequest.leaveCategory.leaveDescr}</td>
                  <td>{showFullString(leaveRequest.halfDay)}</td>
                  <td>{leaveRequest.leaveDuration} day/s</td>
                  <td>
                    <Button
                      component={Link}
                      variant="contained"
                      color="primary"
                      tag={Link}
                      to={`/managerapproval/view/${
                        leaveRequest.id.emplid
                      }/${formatDate(leaveRequest.id.effDate)}/${formatDate(
                        leaveRequest.id.startDate
                      )}/${leaveRequest.id.leaveCode}`}
                      activeclassname="active"
                      data={leaveRequest}
                      style={{ textTransform: "none", color: "white" }}
                    >
                      <span
                        className="fa fa-folder-open"
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
