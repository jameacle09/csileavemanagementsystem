import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
import "../common/Styles.css";

class ExportToExcel extends Component {
  render() {
    const borderStyle = {
      border: "1px solid black"
    };
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
              return (
                <tr key={index}>
                  <td style={borderStyle}>{LeaveRequest.id.emplid}</td>
                  <td style={borderStyle}>
                    {LeaveRequest.employeeDetails.name}
                  </td>
                  <td style={borderStyle}>
                    {LeaveRequest.employeeDetails.jobTitle}
                  </td>
                  <td style={borderStyle}>
                    {formatDateDMY(LeaveRequest.id.startDate)}
                  </td>
                  <td style={borderStyle}>
                    {formatDateDMY(LeaveRequest.endDate)}
                  </td>
                  <td style={borderStyle}>
                    {LeaveRequest.leaveCategory.leaveDescr}
                  </td>
                  <td style={borderStyle}>{LeaveRequest.halfDay}</td>
                  <td style={borderStyle}>{LeaveRequest.leaveDuration}</td>
                  <td style={borderStyle}>{LeaveRequest.leaveStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;
