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
      leaveStatusLookup: []
    };
  }

  componentDidMount() {
    this.loadLeaveStatusLookup();
  }

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
              return (
                <tr key={index}>
                  <td style={borderStyle}>
                    {formatDateDMY(leaveHistory.id.startDate)}
                  </td>
                  <td style={borderStyle}>
                    {formatDateDMY(leaveHistory.endDate)}
                  </td>
                  <td style={borderStyle}>
                    {leaveHistory.leaveDuration} day(s)
                  </td>
                  <td style={borderStyle}>
                    {leaveHistory.leaveCategory.leaveDescr}
                  </td>
                  <td style={borderStyle}>{leaveHistory.reason}</td>
                  <td style={borderStyle}>
                    {formatDateDMY(leaveHistory.id.effDate)}
                  </td>
                  <td style={borderStyle}>
                    {getLeaveStatusDesc(leaveHistory.leaveStatus)}
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

export default MyLeaveHistoryToExcel;
