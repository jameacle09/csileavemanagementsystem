import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class MyLeaveDetailsToExcel extends Component {
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
    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="My Leave Details"
          sheet="MyLeaveDetails"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="6" style={{ fontSize: "28px", textAlign: "left" }}>
                My Leave Details
              </th>
            </tr>
            <tr>
              <th colSpan="6" align="left">
                Leave Details Of: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="6" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="6" />
            </tr>
            <tr>
              <th style={borderStyle}>Leave Type</th>
              <th style={borderStyle}>Entitlement</th>
              <th style={borderStyle}>Carried Forward</th>
              <th style={borderStyle}>Available</th>
              <th style={borderStyle}>Taken</th>
              <th style={borderStyle}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveDetailsData.map((leaveDetails, index) => {
              return (
                <tr key={index}>
                  <td style={borderStyle}>
                    {leaveDetails.leaveCategory.leaveDescr}
                  </td>
                  <td style={borderStyle} align="center">
                    {leaveDetails.entitlement} day(s)
                  </td>
                  <td style={borderStyle} align="center">
                    {leaveDetails.carryForward} day(s)
                  </td>
                  <td style={borderStyle} align="center">
                    {leaveDetails.availableLeave} day(s)
                  </td>
                  <td style={borderStyle} align="center">
                    {leaveDetails.takenLeave} day(s)
                  </td>
                  <td style={borderStyle} align="center">
                    {leaveDetails.balanceLeave} day(s)
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
export default MyLeaveDetailsToExcel;
