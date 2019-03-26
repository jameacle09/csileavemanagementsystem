import React, { Component } from "react";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { fetchData, formatDateYMD, formatDateDMY } from "../util/APIUtils";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import MyLeaveHistoryToExcel from "./MyLeaveHistoryToExcel";
import LoadingPage from "../common/LoadingPage";

class MyLeaveHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveStatusLookup: [],
      userData: [],
      loading: true
    };
    this.loadMyLeaveHistory = this.loadMyLeaveHistory.bind(this);
  }

  loadMyLeaveHistory() {
    fetchData({
      url: API_BASE_URL + "/appliedleave/me",
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
    this.loadLeaveStatusLookup();
    this.loadMyLeaveHistory();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveHistory();
    }
  }

  loadLeaveStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/leave_status",
      method: "GET"
    })
      .then(data => this.setState({ leaveStatusLookup: data }))
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
    // const showFullString = strStatus => {
    //   if (strStatus === "PNAPV") {
    //     return "Pending Approve";
    //   } else if (strStatus === "APPRV") {
    //     return "Approved";
    //   } else if (strStatus === "CANCL") {
    //     return "Cancelled";
    //   } else if (strStatus === "PNCLD") {
    //     return "Pending Cancel";
    //   } else if (strStatus === "REJCT") {
    //     return "Rejected";
    //   }
    // };

    const getLeaveStatusDesc = strLeaveStatus => {
      let arrLeaveStatusLookup = this.state.leaveStatusLookup;
      let leaveDesc = "";
      arrLeaveStatusLookup.forEach(leaveStat => {
        if (leaveStat.id.fieldvalue === strLeaveStatus) {
          return (leaveDesc = leaveStat.xlatlongname);
        }
      });
      return leaveDesc;
    };

    const myLeaveHistoryCols = [
      {
        id: "startDate",
        Header: "Start Date",
        accessor: d => formatDateDMY(d.id.startDate),
        minWidth: 90,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "endDate",
        Header: "End Date",
        accessor: d => formatDateDMY(d.endDate),
        minWidth: 90,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveDuration",
        Header: "Duration",
        accessor: str => str.leaveDuration + " day(s)",
        minWidth: 90,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "leaveCategory.leaveDescr",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "reason",
        Header: "Reason",
        accessor: "reason",
        minWidth: 200,
        sortable: true,
        filterable: true
      },
      {
        id: "effDate",
        Header: "Applied Date",
        accessor: d => formatDateDMY(d.id.effDate),
        minWidth: 90,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveStatus",
        Header: "Status",
        accessor: d => getLeaveStatusDesc(d.leaveStatus),
        minWidth: 120,
        sortable: true,
        filterable: true
      },
      {
        id: "Action",
        Header: "Action",
        accessor: viewButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/myleavehistory/view/${viewButton.id.emplid}/${formatDateYMD(
              viewButton.id.effDate
            )}/${formatDateYMD(viewButton.id.startDate)}/${
              viewButton.id.leaveCode
            }`}
            activeclassname="active"
            className="smallButtonOverride"
          >
            <span className="fa fa-folder-open" style={{ color: "white" }} />
            &nbsp;View
          </Button>
        ),
        minWidth: 90,
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
          <span>
            <h3 className="headerStyle">My Leave History</h3>
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
                    onClick={() =>
                      document.getElementById("test-table-xls-button").click()
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
                columns={myLeaveHistoryCols}
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
                loadingText="Loading Leave History..."
                noDataText="No data available."
                className="-striped"
              />
              <MyLeaveHistoryToExcel userData={this.state.userData} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MyLeaveHistory;
