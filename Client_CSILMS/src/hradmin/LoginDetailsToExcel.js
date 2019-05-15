import React, { Component } from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";

class ExportToExcel extends Component {
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
              <th colSpan="3" style={{ fontSize: "28px", textAlign: "left" }}>
                Login Details List
              </th>
            </tr>
            <tr>
              <th colSpan="3" align="left">
                Extracted By: {this.state.userProfile.name}
              </th>
            </tr>
            <tr>
              <th colSpan="3" align="left">
                Date Extracted: {formatDateDMY(new Date())}
              </th>
            </tr>
            <tr>
              <th colSpan="3" />
            </tr>
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
                    {showYesNoDesc(login.accountLocked)}
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
