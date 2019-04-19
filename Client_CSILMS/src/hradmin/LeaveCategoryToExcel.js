import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
          filename="Leave Category"
          sheet="LeaveCategory"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th style={borderStyle}>Leave Code</th>
              <th style={borderStyle}>Leave Description</th>
              <th style={borderStyle}>Entitlement</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaveCategoryDetails.map((leaveCategory, index) => {
              return (
                <tr key={index}>
                  <td style={borderStyle}>{leaveCategory.leaveCode}</td>
                  <td style={borderStyle}>{leaveCategory.leaveDescr}</td>
                  <td style={borderStyle}>{leaveCategory.entitlement}</td>
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
