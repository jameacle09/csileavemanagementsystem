import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
import "../common/Styles.css";

class ExportToExcel extends Component {
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
              return (
                <tr key={index}>
                  <td style={borderStyle}>
                    {leaveHistory.employeeDetails.emplId}
                  </td>
                  <td style={borderStyle}>
                    {leaveHistory.employeeDetails.name}
                  </td>
                  <td style={borderStyle}>
                    {leaveHistory.leaveCategory.leaveDescr}
                  </td>
                  <td style={borderStyle}>
                    {formatDateDMY(leaveHistory.id.startDate)}
                  </td>
                  <td style={borderStyle}>
                    {formatDateDMY(leaveHistory.endDate)}
                  </td>
                  <td style={borderStyle}>
                    {showFullString(leaveHistory.halfDay)}
                  </td>
                  <td style={borderStyle}>
                    {leaveHistory.leaveDuration} day(s)
                  </td>
                  <td style={borderStyle}>{leaveHistory.reason}</td>
                  <td style={borderStyle}>{leaveHistory.leaveStatus}</td>
                  <td style={borderStyle}>
                    {formatDateDMY(leaveHistory.approvedDate)}
                  </td>
                  <td style={borderStyle}>{leaveHistory.approver}</td>
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
