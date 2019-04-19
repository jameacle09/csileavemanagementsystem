import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../common/Styles.css";

class TranslateitemToExcel extends Component {
  render() {
    const showStatusDesc = strStatus => {
      if (strStatus === "A") {
        return "Active";
      } else {
        return "Inactive";
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
          filename="Translateitem"
          sheet="Translateitem"
          buttonText="Export List to Excel"
        /> */}
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th style={borderStyle}>Field Name</th>
              <th style={borderStyle}>Field Value</th>
              <th style={borderStyle}>Field Long Name</th>
              <th style={borderStyle}>Field Short Name</th>
              <th style={borderStyle}>Effective Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.translateItemsData.map((translateitem, index) => {
              return (
                <tr key={index}>
                  <td style={borderStyle}>{translateitem.id.fieldname}</td>
                  <td style={borderStyle}>{translateitem.id.fieldvalue}</td>
                  <td style={borderStyle}>{translateitem.xlatlongname}</td>
                  <td style={borderStyle}>{translateitem.xlatshortname}</td>
                  <td style={borderStyle}>
                    {showStatusDesc(translateitem.effStatus)}
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
export default TranslateitemToExcel;
