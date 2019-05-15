import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class ExportToExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: []
    };
  }

  componentDidMount() {
    this.loadCurrentUserProfile();
  }

  loadCurrentUserProfile = () => {
    fetchData({
      url: API_BASE_URL + "/persondetail/me",
      method: "GET"
    })
      .then(data => {
        this.setState({
          userProfile: data
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  render() {
    const showFullString = strHalfDay => {
      if (strHalfDay === "Y") {
        return "Yes";
      } else {
        return "No";
      }
    };

    const borderStyle = {
      border: "1px solid black"
    };

    const tableRowsInit = (leaveHistory, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveHistory.employeeDetails.emplId}
        </td>
        <td style={borderStyle}>{leaveHistory.employeeDetails.name}</td>
        <td style={borderStyle}>{leaveHistory.leaveCategory.leaveDescr}</td>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.id.startDate)}
        </td>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.endDate)}
        </td>
        <td style={borderStyle} align="center">
          {showFullString(leaveHistory.halfDay)}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.leaveDuration} day(s)
        </td>
        <td style={borderStyle}>{leaveHistory.reason}</td>
        <td style={borderStyle} align="center">
          {leaveHistory.leaveStatus}
        </td>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.approvedDate)}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.approver}
        </td>
      </tr>
    );

    const tableRowsFiltered = (leaveHistory, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveHistory.emplId}
        </td>
        <td style={borderStyle}>{leaveHistory.name}</td>
        <td style={borderStyle}>{leaveHistory.leaveType}</td>
        <td style={borderStyle} align="center">
          {leaveHistory.startDate}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.endDate}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.halfDay}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.Duration}
        </td>
        <td style={borderStyle}>{leaveHistory.reason}</td>
        <td style={borderStyle} align="center">
          {leaveHistory.leaveStatus}
        </td>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.approvedDate)}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.approver}
        </td>
      </tr>
    );

    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Employee Leave History"
          sheet="tablexls"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="11" style={{ fontSize: "28px", textAlign: "left" }}>
                Leave History List
              </th>
            </tr>
            <tr>
              <th colSpan="11" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="11" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="11" />
            </tr>
            <tr>
              <th style={borderStyle}>Employee ID</th>
              <th style={borderStyle}>Employee Name</th>
              <th style={borderStyle}>Leave Type</th>
              <th style={borderStyle}>Start Date</th>
              <th style={borderStyle}>End Date</th>
              <th style={borderStyle}>Half Day?</th>
              <th style={borderStyle}>Duration</th>
              <th style={borderStyle}>Leave Reason</th>
              <th style={borderStyle}>Leave Status</th>
              <th style={borderStyle}>Date Status Changed</th>
              <th style={borderStyle}>Status Changed By</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveHistoryData.map((leaveHistory, index) => {
              return leaveHistory.id
                ? tableRowsInit(leaveHistory, index)
                : tableRowsFiltered(leaveHistory, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;
