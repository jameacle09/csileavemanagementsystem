import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
import "../common/Styles.css";

class ExportToExcel extends Component {
  render() {
    const borderStyle = {
      border: "1px solid black"
    };

    return (
      <div style={{ marginRight: "25px" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="EmployeeProfiles"
          sheet="EmployeeProfiles"
          buttonText="Export to Excel"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colspan="17" style={{ fontSize: "28px", textAlign: "left" }}>
                Employee Profiles List
              </th>
            </tr>
            <tr>
              <th colspan="17" align="left">
                Report Exracted on {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colspan="17" />
            </tr>
            <tr>
              <th style={borderStyle}>Employee ID</th>
              <th style={borderStyle}>Employee Name</th>
              <th style={borderStyle}>Business Email</th>
              <th style={borderStyle}>Gender</th>
              <th style={borderStyle}>NRIC/Passport No.</th>
              <th style={borderStyle}>Married Status</th>
              <th style={borderStyle}>Date Married</th>
              <th style={borderStyle}>MarriedCnt</th>
              <th style={borderStyle}>ChildrenCnt</th>
              <th style={borderStyle}>Job Title</th>
              <th style={borderStyle}>Mobile No.</th>
              <th style={borderStyle}>Business Unit</th>
              <th style={borderStyle}>Department ID</th>
              <th style={borderStyle}>Line Manager ID</th>
              <th style={borderStyle}>Line Manager Name</th>
              <th style={borderStyle}>Join Date</th>
              <th style={borderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employeeProfiles.map((empProfile, index) => {
              return (
                <tr key={index}>
                  <td style={borderStyle}>{empProfile.emplId}</td>
                  <td style={borderStyle}>{empProfile.name}</td>
                  <td style={borderStyle}>{empProfile.businessEmail}</td>
                  <td align="center" style={borderStyle}>
                    {empProfile.gender}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.nricPassport}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.marriageStatus}
                  </td>
                  <td align="center" style={borderStyle}>
                    {formatDateDMY(empProfile.marriageDate)}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.marriageCount}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.totalChildren}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.jobTitle}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.mobileNo}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.businessUnit}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.deptId}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.reportsTo.emplId}
                  </td>
                  <td style={borderStyle}>{empProfile.reportsTo.name}</td>
                  <td align="center" style={borderStyle}>
                    {formatDateDMY(empProfile.joinDate)}
                  </td>
                  <td align="center" style={borderStyle}>
                    {empProfile.status}
                  </td>
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
