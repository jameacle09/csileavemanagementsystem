import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class MyLeaveHistoryToExcel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      leaveStatusLookup: [],
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
      .then(data => this.setState({ leaveStatusLookup: data })
      )
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
    // const showFullStatus = strStatus => {
    //   if (strStatus === "PNAPV") {
    //     return "Pending Approve";
    //   } else if (strStatus === "APPRV") {
    //     return "Approved";
    //   } else if (strStatus === "CANCL") {
    //     return "Cancelled";
    //   } else if (strStatus === "PNCLD") {
    //     return "Pending Cancel";
    //   } else if (strStatus === "REJCT") {
    //     return "Rejected";
    //   }
    // };

    const getLeaveStatusDesc = (strLeaveStatus) => {
      let arrLeaveStatusLookup = this.state.leaveStatusLookup;
      let leaveDesc = "";
      arrLeaveStatusLookup.forEach(leaveStat => {
        if (leaveStat.id.fieldvalue === strLeaveStatus) {
          return leaveDesc = leaveStat.xlatlongname;
        }
      });
      return leaveDesc;
    };

    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="My Leave History"
          sheet="MyLeaveHistory"
          buttonText="Export List to Excel"
        />
        <table hidden={true} id="table-to-xls">
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
                  <td>{getLeaveStatusDesc(leaveHistory.leaveStatus)}</td>
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
