import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
import "../common/Styles.css";

class ExportToExcel extends Component {
  render() {
    return (
      <div style={{ marginRight: "25px" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="filteredData"
          sheet="tablexls"
          buttonText="Export to Excel"
        />
        <table hidden="true" id="table-to-xls">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Business Email</th>
              <th>NRIC/Passport No.</th>
              <th>Job Title</th>
              <th>Mobile No.</th>
              <th>Business Unit</th>
              <th>Line Manager</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employeeProfiles.map(empProfile => {
              return (
                <tr key={empProfile.emplId}>
                  <td>{empProfile.emplId}</td>
                  <td>{empProfile.name}</td>
                  <td>{empProfile.businessEmail}</td>
                  <td>{empProfile.nricPassport}</td>
                  <td>{empProfile.jobTitle}</td>
                  <td>{empProfile.mobileNo}</td>
                  <td>{empProfile.businessUnit}</td>
                  <td>{empProfile.reportsTo.name}</td>
                  <td>{formatDateDMY(empProfile.joinDate)}</td>
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
