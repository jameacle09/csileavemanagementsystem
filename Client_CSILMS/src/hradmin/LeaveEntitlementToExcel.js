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
    const borderStyle = {
      border: "1px solid black"
    };

    const tableRowsInit = (leaveEntitlement, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveEntitlement.employeeDetails.emplId}
        </td>
        <td style={borderStyle}>{leaveEntitlement.employeeDetails.name}</td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.employeeDetails.jobTitle}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.employeeDetails.businessUnit}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.employeeDetails.deptId}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.id.year}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.leaveCategory.leaveCode}
        </td>
        <td style={borderStyle}>{leaveEntitlement.leaveCategory.leaveDescr}</td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.carryForward} day(s)
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.entitlement} day(s)
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.availableLeave} day(s)
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.takenLeave} day(s)
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.balanceLeave} day(s)
        </td>
      </tr>
    );

    const tableRowsFiltered = (leaveEntitlement, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveEntitlement.emplid}
        </td>
        <td style={borderStyle}>{leaveEntitlement.name}</td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.jobTitle}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.businessUnit}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.deptId}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.leaveYear}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.leaveCode}
        </td>
        <td style={borderStyle}>{leaveEntitlement.leaveType}</td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.carryForward}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.entitlement}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.availableLeave}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.takenLeave}
        </td>
        <td style={borderStyle} align="center">
          {leaveEntitlement.balanceLeave}
        </td>
      </tr>
    );
    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Leave Entitlements"
          sheet="LeaveEntitlements"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="13" style={{ fontSize: "28px", textAlign: "left" }}>
                Leave Entitlements List
              </th>
            </tr>
            <tr>
              <th colSpan="13" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="13" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="13" />
            </tr>
            <tr>
              <th style={borderStyle}>Employee ID</th>
              <th style={borderStyle}>Employee Name</th>
              <th style={borderStyle}>Job Title</th>
              <th style={borderStyle}>Business Unit</th>
              <th style={borderStyle}>Department ID</th>
              <th style={borderStyle}>Leave Year</th>
              <th style={borderStyle}>Leave Code</th>
              <th style={borderStyle}>Leave Description</th>
              <th style={borderStyle}>Carried Forward</th>
              <th style={borderStyle}>Entitlement</th>
              <th style={borderStyle}>Available Leave</th>
              <th style={borderStyle}>Taken Leave</th>
              <th style={borderStyle}>Balance Leave</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveEntitlementData.map((leaveEntitlement, index) => {
              return leaveEntitlement.id
                ? tableRowsInit(leaveEntitlement, index)
                : tableRowsFiltered(leaveEntitlement, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;
