import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../common/Styles.css";

class MyLeaveDetailsToExcel extends Component {
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
              <th style={borderStyle}>Leave Type</th>
              <th style={borderStyle}>Entitlement</th>
              <th style={borderStyle}>Carry Forward</th>
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
                  <td style={borderStyle}>{leaveDetails.entitlement}</td>
                  <td style={borderStyle}>{leaveDetails.carryForward}</td>
                  <td style={borderStyle}>{leaveDetails.availableLeave}</td>
                  <td style={borderStyle}>{leaveDetails.takenLeave}</td>
                  <td style={borderStyle}>{leaveDetails.balanceLeave}</td>
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
