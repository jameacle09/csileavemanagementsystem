import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import "../common/Styles.css";
import { fetchData, isHrRole, exportTableToExcel } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { confirmAlert } from "react-confirm-alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import ExportToExcel from "./LoginDetailsToExcel";
import LoadingPage from "../common/LoadingPage";

class LoginDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loading: true
    };
    this.loadLoginDetails = this.loadLoginDetails.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.confirmResetPassword = this.confirmResetPassword.bind(this);
    this.lockAccount = this.lockAccount.bind(this);
    this.confirmLockAccount = this.confirmLockAccount.bind(this);
    library.add(faLock);
    library.add(faLockOpen);
  }

  lockAccount(e, emplId, lockAccount) {
    const lock = lockAccount === 1 ? "0" : "1";
    const values = { emplId: emplId, lockAccount: lock };
    const request = Object.assign({}, values);

    fetchData({
      url: API_BASE_URL + "/lockAccount",
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        if (response.emplId) {
          confirmAlert({
            message:
              "You have " +
              (response.lockAccount === 0 ? "un-locked" : "locked") +
              " login account for employee " +
              emplId,
            buttons: [{ label: "OK" }]
          });

          this.setState({ userData: [], loading: true });
          this.loadLoginDetails();
        }
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
  }

  confirmLockAccount(e, emplId, lockAccount) {
    confirmAlert({
      message:
        "Do you want to " +
        (lockAccount === 0 ? "lock" : "un-lock") +
        " login account for employee " +
        emplId +
        "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.lockAccount(e, emplId, lockAccount)
        },
        {
          label: "No"
        }
      ]
    });
  }

  confirmResetPassword(e, emplId) {
    confirmAlert({
      message: "Do you want to reset password for employee " + emplId + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.resetPassword(emplId)
        },
        {
          label: "No"
        }
      ]
    });
  }

  resetPassword(emplId) {
    const values = { emplid: emplId };
    const request = Object.assign({}, values);

    fetchData({
      url: API_BASE_URL + "/resetPassword",
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        confirmAlert({
          message:
            "You have successfully reset password for employee " + emplId,
          buttons: [
            {
              label: "OK"
            }
          ]
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
  }

  loadLoginDetails() {
    fetchData({
      url: API_BASE_URL + "/logindetails",
      method: "GET"
    })
      .then(response => {
        this.setState({
          userData: response,
          loading: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({ userData: userData });
      });
  }

  componentDidMount() {
    this.loadLoginDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLoginDetails();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const showTitle = str => {
      if (str.lockAccount === 1) {
        return "Locked";
      } else {
        return "Un-Locked";
      }
    };
    const showAsIcon = str => {
      if (str.lockAccount === 1) {
        return <FontAwesomeIcon icon="lock" style={{ color: "red" }} />;
      } else {
        return <FontAwesomeIcon icon="lock-open" style={{ color: "green" }} />;
      }
    };

    const loginDetailsCols = [
      {
        id: "userId",
        Header: "User ID (Email)",
        accessor: "userId",
        minWidth: 200,
        sortable: true,
        filterable: true
      },

      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "emplId",
        minWidth: 126,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "lockAccount",
        Header: "Account Locked?",
        accessor: str => (
          <Button
            variant="contained"
            title={showTitle(str)}
            color="link"
            onClick={event =>
              this.confirmLockAccount(event, str.emplId, str.lockAccount)
            }
          >
            {showAsIcon(str)}
          </Button>
        ),
        minWidth: 150,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "quickReset",
        Header: "Quick Reset",
        accessor: resetButton => (
          <Button
            color="primary"
            size="sm"
            onClick={event =>
              this.confirmResetPassword(event, resetButton.emplId)
            }
            variant="contained"
            // style={{ textTransform: "none", color: "white" }}
            activeclassname="active"
            className="smallButtonOverride"
          >
            Reset Password
          </Button>
        ),
        minWidth: 140,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">User Login Details</h3>
          </span>
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <div className="reactTableContainer">
              <div className="mainListBtnContainer">
                <div className="SubListBtnSingleContainer">
                  <Button
                    variant="contained"
                    color="primary"
                    className="largeButtonOverride"
                    // onClick={() =>
                    //   document.getElementById("test-table-xls-button").click()
                    // }
                    onClick={() =>
                      exportTableToExcel("table-to-xls", "LoginDetails")
                    }
                  >
                    <span
                      className="fa fa-file-excel-o"
                      style={{ margin: "0px 5px 0px 0px" }}
                    />
                    Export List to Excel
                  </Button>
                </div>
              </div>
              <ReactTable
                data={this.state.userData}
                columns={loginDetailsCols}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                }
                defaultPageSize={10}
                pages={this.state.pages}
                loading={this.state.loading}
                filterable={true}
                sortable={true}
                multiSort={true}
                // rowsText="Rows per page"
                loadingText="Loading Employee Login Details..."
                noDataText="No data available."
                className="-striped"
              />
              <ExportToExcel LoginDetails={this.state.userData} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(LoginDetails);
