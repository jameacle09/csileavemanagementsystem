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
          filename="Public Holidays"
          sheet="PublicHolidays"
          buttonText="Export to Excel"
        />
        <table hidden="true" id="table-to-xls">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Holiday Description</th>
              <th>State(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.publicHolidayDetails.map((publicHoliday, index) => {
              return (
                <tr key={index}>
                  <td>{formatDateDMY(publicHoliday.holidayDate)}</td>
                  <td>{publicHoliday.holidayDay}</td>
                  <td>{publicHoliday.holidayDescr}</td>
                  <td>{publicHoliday.holidayState}</td>
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
