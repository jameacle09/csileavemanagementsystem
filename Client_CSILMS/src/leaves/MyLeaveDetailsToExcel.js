import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../common/Styles.css";

class MyLeaveDetailsToExcel extends Component {
  render() {
    return (
      <div style={{ marginRight: "25px" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="My Leave Details"
          sheet="MyLeaveDetails"
          buttonText="Export to Excel"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Entitlement</th>
              <th>Carry Forward</th>
              <th>Available</th>
              <th>Taken</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userData.map((leaveDetails, index) => {
              return (
                <tr key={index}>
                  <td>{leaveDetails.leaveCategory.leaveDescr}</td>
                  <td>{leaveDetails.entitlement}</td>
                  <td>{leaveDetails.carryForward}</td>
                  <td>{leaveDetails.availableLeave}</td>
                  <td>{leaveDetails.takenLeave}</td>
                  <td>{leaveDetails.balanceLeave}</td>
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
