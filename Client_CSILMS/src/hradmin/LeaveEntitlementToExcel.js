import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../common/Styles.css";

class ExportToExcel extends Component {
  render() {
    return (
      <div style={{ marginRight: "25px" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Leave Entitlements"
          sheet="LeaveEntitlements"
          buttonText="Export to Excel"
        />
        <table hidden="true" id="table-to-xls">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Job Title</th>
              <th>Business Unit</th>
              <th>Department ID</th>
              <th>Leave Year</th>
              <th>Leave Code</th>
              <th>Leave Description</th>
              <th>Carried Forward</th>
              <th>Entitlement</th>
              <th>Available Leave</th>
              <th>Taken Leave</th>
              <th>Balance Leave</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveEntitlementData.map(leaveEntitlement => {
              return (
                <tr key={leaveEntitlement.employeeDetails.emplId}>
                  <td>{leaveEntitlement.employeeDetails.emplId}</td>
                  <td>{leaveEntitlement.employeeDetails.name}</td>
                  <td>{leaveEntitlement.employeeDetails.jobTitle}</td>
                  <td>{leaveEntitlement.employeeDetails.businessUnit}</td>
                  <td>{leaveEntitlement.employeeDetails.deptId}</td>
                  <td>{leaveEntitlement.id.year}</td>
                  <td>{leaveEntitlement.leaveCategory.leaveCode}</td>
                  <td>{leaveEntitlement.leaveCategory.leaveDescr}</td>
                  <td>{leaveEntitlement.carryForward}</td>
                  <td>{leaveEntitlement.entitlement}</td>
                  <td>{leaveEntitlement.availableLeave}</td>
                  <td>{leaveEntitlement.takenLeave}</td>
                  <td>{leaveEntitlement.balanceLeave}</td>
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
