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

    const tableRowsInit = (publicHoliday, index) => (
      <tr key={index}>
        <td style={borderStyle}>{formatDateDMY(publicHoliday.holidayDate)}</td>
        <td style={borderStyle}>{publicHoliday.holidayDay}</td>
        <td style={borderStyle}>{publicHoliday.holidayDescr}</td>
        <td style={borderStyle}>{publicHoliday.holidayState}</td>
      </tr>
    );

    const tableRowsFiltered = (publicHoliday, index) => (
      <tr key={index}>
        <td style={borderStyle}>{publicHoliday.holidayDate}</td>
        <td style={borderStyle}>{publicHoliday.holidayDay}</td>
        <td style={borderStyle}>{publicHoliday.holidayDescr}</td>
        <td style={borderStyle}>{publicHoliday.holidayState}</td>
      </tr>
    );

    return (
      <div>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Public Holidays"
          sheet="PublicHolidays"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th colSpan="4" style={{ fontSize: "28px", textAlign: "left" }}>
                Public Holidays
              </th>
            </tr>
            <tr>
              <th colSpan="4" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="4" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="4" />
            </tr>
            <tr>
              <th style={borderStyle}>Date</th>
              <th style={borderStyle}>Day</th>
              <th style={borderStyle}>Holiday Description</th>
              <th style={borderStyle}>State(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.publicHolidayDetails.map((publicHoliday, index) => {
              return publicHoliday.id
                ? tableRowsInit(publicHoliday, index)
                : tableRowsFiltered(publicHoliday, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;
