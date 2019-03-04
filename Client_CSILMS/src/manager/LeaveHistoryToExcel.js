import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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

    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Employee Leave History"
          sheet="tablexls"
          buttonText="Export List to Excel"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Half Day?</th>
              <th>Duration</th>
              <th>Leave Reason</th>
              <th>Leave Status</th>
              <th>Date Status Changed</th>
              <th>Status Changed By</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveHistoryData.map((leaveHistory, index) => {
              return (
                <tr key={index}>
                  <td>{leaveHistory.employeeDetails.emplId}</td>
                  <td>{leaveHistory.employeeDetails.name}</td>
                  <td>{leaveHistory.leaveCategory.leaveDescr}</td>
                  <td>{formatDateDMY(leaveHistory.id.startDate)}</td>
                  <td>{formatDateDMY(leaveHistory.endDate)}</td>
                  <td>{showFullString(leaveHistory.halfDay)}</td>
                  <td>{leaveHistory.leaveDuration} day(s)</td>
                  <td>{leaveHistory.reason}</td>
                  <td>{leaveHistory.leaveStatus}</td>
                  <td>{formatDateDMY(leaveHistory.approvedDate)}</td>
                  <td>{leaveHistory.approver}</td>
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
