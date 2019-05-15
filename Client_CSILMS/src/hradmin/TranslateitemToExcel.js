import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class TranslateitemToExcel extends Component {
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

    const tableRowsInit = (translateitem, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {translateitem.id.fieldname}
        </td>
        <td style={borderStyle} align="center">
          {translateitem.id.fieldvalue}
        </td>
        <td style={borderStyle}>{translateitem.xlatlongname}</td>
        <td style={borderStyle}>{translateitem.xlatshortname}</td>
        <td style={borderStyle} align="center">
          {showStatusDesc(translateitem.effStatus)}
        </td>
      </tr>
    );

    const tableRowsFiltered = (translateitem, index) => (
      <tr key={index}>
        <td style={borderStyle} align="center">
          {translateitem.fieldname}
        </td>
        <td style={borderStyle} align="center">
          {translateitem.fieldvalue}
        </td>
        <td style={borderStyle}>{translateitem.xlatlongname}</td>
        <td style={borderStyle}>{translateitem.xlatshortname}</td>
        <td style={borderStyle} align="center">
          {translateitem.effStatus}
        </td>
      </tr>
    );
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
              <th colSpan="5" style={{ fontSize: "28px", textAlign: "left" }}>
                Translate Items List
              </th>
            </tr>
            <tr>
              <th colSpan="5" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="5" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="5" />
            </tr>
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
              return translateitem.id
                ? tableRowsInit(translateitem, index)
                : tableRowsFiltered(translateitem, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default TranslateitemToExcel;
