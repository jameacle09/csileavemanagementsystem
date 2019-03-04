import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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

    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exportToExcelButton"
          table="table-to-xls"
          filename="Translateitem"
          sheet="Translateitem"
          buttonText="Export List to Excel"
        />
        <table hidden="true" id="table-to-xls">
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Field Value</th>
              <th>Field Long Name</th>
              <th>Field Short Name</th>
              <th>Effective Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.translateItemsData.map((translateitem, index) => {
              return (
                <tr key={index}>
                  <td>{translateitem.id.fieldname}</td>
                  <td>{translateitem.id.fieldvalue}</td>
                  <td>{translateitem.xlatlongname}</td>
                  <td>{translateitem.xlatshortname}</td>
                  <td>{showStatusDesc(translateitem.effStatus)}</td>
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
