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

    const tableRowsInit = (leaveCategory, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveCategory.leaveCode}
        </td>
        <td style={borderStyle}>{leaveCategory.leaveDescr}</td>
        <td style={borderStyle} align="center">
          {leaveCategory.entitlement} day(s)
        </td>
      </tr>
    );

    const tableRowsFiltered = (leaveCategory, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveCategory.leaveCode}
        </td>
        <td style={borderStyle}>{leaveCategory.leaveDescr}</td>
        <td style={borderStyle} align="center">
          {leaveCategory.entitlement}
        </td>
      </tr>
    );

    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Leave Category"
          sheet="LeaveCategory"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="3" style={{ fontSize: "28px", textAlign: "left" }}>
                Leave Categories List
              </th>
            </tr>
            <tr>
              <th colSpan="3" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="3" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="3" />
            </tr>
            <tr>
              <th style={borderStyle}>Leave Code</th>
              <th style={borderStyle}>Leave Description</th>
              <th style={borderStyle}>Entitlement</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveCategoryDetails.map((leaveCategory, index) => {
              return leaveCategory.id
                ? tableRowsInit(leaveCategory, index)
                : tableRowsFiltered(leaveCategory, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;
