import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class MyLeaveHistoryToExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      leaveStatusLookup: []
    };
  }

  componentDidMount() {
    this.loadCurrentUserProfile();
    this.loadLeaveStatusLookup();
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

  loadLeaveStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/leave_status",
      method: "GET"
    })
      .then(data => this.setState({ leaveStatusLookup: data }))
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
    const getLeaveStatusDesc = strLeaveStatus => {
      let arrLeaveStatusLookup = this.state.leaveStatusLookup;
      let leaveDesc = "";
      arrLeaveStatusLookup.forEach(leaveStat => {
        if (leaveStat.id.fieldvalue === strLeaveStatus) {
          return (leaveDesc = leaveStat.xlatlongname);
        }
      });
      return leaveDesc;
    };

    const borderStyle = {
      border: "1px solid black"
    };

    const tableRowsInit = (leaveHistory, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.id.startDate)}
        </td>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.endDate)}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.leaveDuration} day(s)
        </td>
        <td style={borderStyle}>{leaveHistory.leaveCategory.leaveDescr}</td>
        <td style={borderStyle}>{leaveHistory.reason}</td>
        <td style={borderStyle} align="center">
          {formatDateDMY(leaveHistory.id.effDate)}
        </td>
        <td style={borderStyle}>
          {getLeaveStatusDesc(leaveHistory.leaveStatus)}
        </td>
      </tr>
    );
    const tableRowsFiltered = (leaveHistory, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {leaveHistory.startDate}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.endDate}
        </td>
        <td style={borderStyle} align="center">
          {leaveHistory.leaveDuration}
        </td>
        <td style={borderStyle}>{leaveHistory.leaveType}</td>
        <td style={borderStyle}>{leaveHistory.reason}</td>
        <td style={borderStyle} align="center">
          {leaveHistory.effDate}
        </td>
        <td style={borderStyle}>{leaveHistory.leaveStatus}</td>
      </tr>
    );

    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="My Leave History"
          sheet="MyLeaveHistory"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="7" style={{ fontSize: "28px", textAlign: "left" }}>
                My Leave History
              </th>
            </tr>
            <tr>
              <th colSpan="7" align="left">
                Leave History Of: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="7" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="7" />
            </tr>
            <tr>
              <th style={borderStyle}>Start Date</th>
              <th style={borderStyle}>End Date</th>
              <th style={borderStyle}>Duration</th>
              <th style={borderStyle}>Leave Type</th>
              <th style={borderStyle}>Leave Reason</th>
              <th style={borderStyle}>Applied Date</th>
              <th style={borderStyle}>Leave Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userData.map((leaveHistory, index) => {
              return leaveHistory.id
                ? tableRowsInit(leaveHistory, index)
                : tableRowsFiltered(leaveHistory, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyLeaveHistoryToExcel;
