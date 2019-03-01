import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
    return (
      <div style={{ marginRight: "25px" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="LoginDetails"
          sheet="LoginDetails"
          buttonText="Export to Excel"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th>User ID (Business Email)</th>
              <th>Employee ID</th>
              <th>Account Locked?</th>
            </tr>
          </thead>
          <tbody>
            {this.props.LoginDetails.map((login, index) => {
              return (
                <tr key={index}>
                  <td>{login.userId}</td>
                  <td align="center">{login.emplId}</td>
                  <td align="center">{showYesNoDesc(login.lockAccount)}</td>
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
