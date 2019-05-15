import React, { Component } from "react";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  fetchData,
  formatDateYMD,
  formatDateDMY,
  exportTableToExcel
} from "../util/APIUtils";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import MyLeaveHistoryToExcel from "./MyLeaveHistoryToExcel";
import LoadingPage from "../common/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyLeaveHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveStatusLookup: [],
      userData: [],
      filteredData: [],
      filteredLength: 0,
      loading: true
    };
    this.loadMyLeaveHistory = this.loadMyLeaveHistory.bind(this);
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
        this.populateFilteredData();
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        let userData = [];
        this.setState({ userData: userData });
      });
  }

  populateFilteredData = () => {
    // This will initialize values for the State Filtered Data
    const arrFilteredData = [...this.state.userData];
    this.setState({
      filteredData: arrFilteredData,
      filteredLength: arrFilteredData.length,
      loading: false
    });
  };

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
            <FontAwesomeIcon icon="eye" />
            {/* <span className="fa fa-folder-open" style={{ color: "white" }} /> */}{" "}
            View
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
                    // onClick={() =>
                    //   document.getElementById("test-table-xls-button").click()
                    // }
                    onClick={() =>
                      exportTableToExcel("table-to-xls", "MyLeaveHistory")
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
                pageSizeOptions={[
                  10,
                  20,
                  30,
                  50,
                  100,
                  this.state.filteredLength
                ]}
                defaultPageSize={10}
                pages={this.state.pages}
                loading={this.state.loading}
                filterable={true}
                sortable={true}
                multiSort={true}
                loadingText="Loading Leave History..."
                noDataText="No data available."
                className="-striped"
                showPagination={true}
                showPageSizeOptions={true}
                ref={refer => {
                  this.selectTable = refer;
                }}
                onFilteredChange={() => {
                  const filteredData = this.selectTable.getResolvedState()
                    .sortedData;
                  const filteredDataLength = this.selectTable.getResolvedState()
                    .sortedData.length;
                  this.setState({
                    filteredData: filteredData,
                    filteredLength: filteredDataLength
                  });
                }}
              />
              <MyLeaveHistoryToExcel userData={this.state.filteredData} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MyLeaveHistory;
