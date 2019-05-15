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

    const getLeaveStatusDesc = strLeaveStatus => {
      let arrLeaveStatusLookup = this.props.leaveStatusLookup;
      let leaveDesc = "";
      arrLeaveStatusLookup.forEach(leaveStat => {
        if (leaveStat.id.fieldvalue === strLeaveStatus) {
          return (leaveDesc = leaveStat.xlatlongname);
        }
      });
      return leaveDesc;
    };

    const borderStyle = {
      border: "1px solid black"
    };

    const tableRowsInit = (LeaveRequest, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {LeaveRequest.id.emplid}
        </td>
        <td style={borderStyle}>{LeaveRequest.employeeDetails.name}</td>
        <td style={borderStyle} align="center">
          {LeaveRequest.employeeDetails.jobTitle}
        </td>
        <td style={borderStyle} align="center">
          {formatDateDMY(LeaveRequest.id.startDate)}
        </td>
        <td style={borderStyle} align="center">
          {formatDateDMY(LeaveRequest.endDate)}
        </td>
        <td style={borderStyle}>{LeaveRequest.leaveCategory.leaveDescr}</td>
        <td style={borderStyle} align="center">
          {showFullString(LeaveRequest.halfDay)}
        </td>
        <td style={borderStyle} align="center">
          {LeaveRequest.leaveDuration} day(s)
        </td>
        <td style={borderStyle} align="center">
          {getLeaveStatusDesc(LeaveRequest.leaveStatus)}
        </td>
      </tr>
    );

    const tableRowsFiltered = (LeaveRequest, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {LeaveRequest.emplId}
        </td>
        <td style={borderStyle}>{LeaveRequest.name}</td>
        <td style={borderStyle} align="center">
          {LeaveRequest.jobTitle}
        </td>
        <td style={borderStyle} align="center">
          {LeaveRequest.startDate}
        </td>
        <td style={borderStyle} align="center">
          {LeaveRequest.endDate}
        </td>
        <td style={borderStyle}>{LeaveRequest.leaveType}</td>
        <td style={borderStyle} align="center">
          {LeaveRequest.halfDay}
        </td>
        <td style={borderStyle} align="center">
          {LeaveRequest.duration}
        </td>
        <td style={borderStyle} align="center">
          {LeaveRequest.leaveStatus}
        </td>
      </tr>
    );
    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Leave Request List"
          sheet="LeaveRequest"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="9" style={{ fontSize: "28px", textAlign: "left" }}>
                Leave Requests List
              </th>
            </tr>
            <tr>
              <th colSpan="9" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="9" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="9" />
            </tr>
            <tr>
              <th style={borderStyle}>Employee ID</th>
              <th style={borderStyle}>Employee Name</th>
              <th style={borderStyle}>Job Title</th>
              <th style={borderStyle}>Start Date</th>
              <th style={borderStyle}>End Date</th>
              <th style={borderStyle}>Leave Type</th>
              <th style={borderStyle}>Half Day</th>
              <th style={borderStyle}>Duration</th>
              <th style={borderStyle}>Leave Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveRequestData.map((LeaveRequest, index) => {
              return LeaveRequest.id
                ? tableRowsInit(LeaveRequest, index)
                : tableRowsFiltered(LeaveRequest, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;
