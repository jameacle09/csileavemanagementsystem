import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
          filename="Leave Entitlements"
          sheet="LeaveEntitlements"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
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
              return (
                <tr key={index}>
                  <td style={borderStyle}>
                    {leaveEntitlement.employeeDetails.emplId}
                  </td>
                  <td style={borderStyle}>
                    {leaveEntitlement.employeeDetails.name}
                  </td>
                  <td style={borderStyle}>
                    {leaveEntitlement.employeeDetails.jobTitle}
                  </td>
                  <td style={borderStyle}>
                    {leaveEntitlement.employeeDetails.businessUnit}
                  </td>
                  <td style={borderStyle}>
                    {leaveEntitlement.employeeDetails.deptId}
                  </td>
                  <td style={borderStyle}>{leaveEntitlement.id.year}</td>
                  <td style={borderStyle}>
                    {leaveEntitlement.leaveCategory.leaveCode}
                  </td>
                  <td style={borderStyle}>
                    {leaveEntitlement.leaveCategory.leaveDescr}
                  </td>
                  <td style={borderStyle}>{leaveEntitlement.carryForward}</td>
                  <td style={borderStyle}>{leaveEntitlement.entitlement}</td>
                  <td style={borderStyle}>{leaveEntitlement.availableLeave}</td>
                  <td style={borderStyle}>{leaveEntitlement.takenLeave}</td>
                  <td style={borderStyle}>{leaveEntitlement.balanceLeave}</td>
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
