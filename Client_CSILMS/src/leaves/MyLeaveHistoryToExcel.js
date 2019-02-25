import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
import "../common/Styles.css";

class MyLeaveHistoryToExcel extends Component {
  render() {
    const showFullStatus = strStatus => {
      if (strStatus === "PNAPV") {
        return "Pending Approve";
      } else if (strStatus === "APPRV") {
        return "Approved";
      } else if (strStatus === "CANCL") {
        return "Cancelled";
      } else if (strStatus === "PNCLD") {
        return "Pending Cancel";
      } else if (strStatus === "REJCT") {
        return "Rejected";
      }
    };  

    return (
      <div style={{ marginRight: "25px" }}>  
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="My Leave History"
          sheet="MyLeaveHistory"
          buttonText="Export to Excel"
        />
        <table hidden="true" id="table-to-xls">
          <thead>
            <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>              
            <th>Leave Type</th>
            <th>Leave Reason</th>              
            <th>Applied Date</th>
            <th>Leave Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userData.map((leaveHistory, index) => {
              return (
                <tr key={index}>
                <td>{formatDateDMY(leaveHistory.id.startDate)}</td>
                <td>{formatDateDMY(leaveHistory.endDate)}</td>                  
                <td>{leaveHistory.leaveDuration} day(s)</td>
                <td>{leaveHistory.leaveCategory.leaveDescr}</td>
                <td>{leaveHistory.reason}</td>
                <td>{formatDateDMY(leaveHistory.id.effDate)}</td>
                <td>{showFullStatus(leaveHistory.leaveStatus)}</td>                  
                </tr>
              );
            })}
          </tbody>
        </table>        
      </div>     
        );
    }
}

export default MyLeaveHistoryToExcel;