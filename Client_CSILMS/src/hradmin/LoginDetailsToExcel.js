import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../common/Styles.css";

class ExportToExcel extends Component {
  render() {
    const showYesNoDesc = nbrLocked => {
      if (nbrLocked === 0) {
        return "No";
      } else {
        return "Yes";
      }
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
          filename="LoginDetails"
          sheet="LoginDetails"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th style={borderStyle}>User ID (Business Email)</th>
              <th style={borderStyle}>Employee ID</th>
              <th style={borderStyle}>Account Locked?</th>
            </tr>
          </thead>
          <tbody>
            {this.props.LoginDetails.map((login, index) => {
              return (
                <tr key={index}>
                  <td style={borderStyle}>{login.userId}</td>
                  <td align="center" style={borderStyle}>
                    {login.emplId}
                  </td>
                  <td align="center" style={borderStyle}>
                    {showYesNoDesc(login.lockAccount)}
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
export default ExportToExcel;
