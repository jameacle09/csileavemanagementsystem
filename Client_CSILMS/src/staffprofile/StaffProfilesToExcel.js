import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
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
        }
      });
  };

  render() {
    const borderStyle = {
      border: "1px solid black"
    };
    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="EmployeeProfiles"
          sheet="EmployeeProfiles"
          buttonText="Export List to Excel"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="17" style={{ fontSize: "28px", textAlign: "left" }}>
                Employee Profiles List
              </th>
            </tr>
            <tr>
              <th colSpan="17" align="left">
                Report Extracted On: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="17" align="left">
                Report Extracted By: {this.state.userProfile.name}
              </th>
            </tr>

            <tr>
              <th colSpan="17" />
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
                    {empProfile.LineMgrID}
                  </td>
                  <td style={borderStyle}>{empProfile.LineMgrName}</td>
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
