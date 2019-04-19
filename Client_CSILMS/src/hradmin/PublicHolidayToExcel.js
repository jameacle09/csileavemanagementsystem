import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
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
          filename="Public Holidays"
          sheet="PublicHolidays"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th style={borderStyle}>Date</th>
              <th style={borderStyle}>Day</th>
              <th style={borderStyle}>Holiday Description</th>
              <th style={borderStyle}>State(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.publicHolidayDetails.map((publicHoliday, index) => {
              return (
                <tr key={index}>
                  <td style={borderStyle}>
                    {formatDateDMY(publicHoliday.holidayDate)}
                  </td>
                  <td style={borderStyle}>{publicHoliday.holidayDay}</td>
                  <td style={borderStyle}>{publicHoliday.holidayDescr}</td>
                  <td style={borderStyle}>{publicHoliday.holidayState}</td>
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
