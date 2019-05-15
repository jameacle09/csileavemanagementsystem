import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  fetchData,
  isManagerRole,
  formatDateYMD,
  formatDateDMY,
  exportTableToExcel
} from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./LeaveRequestListToExcel";
import LoadingPage from "../common/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LeaveRequestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveStatusLookup: [],
      leaveRequestData: [],
      filteredData: [],
      filteredLength: 0,
      loading: true
    };
    this.loadLeaveRequestList = this.loadLeaveRequestList.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this.loadLeaveRequestList();
    this.loadLeaveStatusLookup();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLeaveRequestList();
    }
  }

  loadLeaveRequestList() {
    fetchData({
      url: API_BASE_URL + "/appliedleave/me/pendingapproval",
      method: "GET"
    })
      .then(data => {
        this.setState({
          leaveRequestData: data,
          loading: false
        });
        this.populateFilteredData();
      })
      .catch(err => {
        console.log(err);
      });
  }

  populateFilteredData = () => {
    // This will initialize values for the State Filtered Data
    const arrFilteredData = [...this.state.leaveRequestData];
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
    if (!isManagerRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const showFullString = strHalfDay => {
      if (strHalfDay === "Y") {
        return "Yes";
      } else {
        return "No";
      }
    };

    const leaveRequestsCols = [
      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "id.emplid",
        width: 120,
        sortable: true,
        filterable: true
      },
      {
        id: "name",
        Header: "Employee Name",
        accessor: "employeeDetails.name",
        minWidth: 180,
        sortable: true,
        filterable: true
      },
      {
        id: "jobTitle",
        Header: "Job Title",
        accessor: "employeeDetails.jobTitle",
        minWidth: 100,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "startDate",
        Header: "Start Date",
        accessor: d => formatDateDMY(d.id.startDate),
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 150,
        sortable: true,
        filterable: true
      },
      {
        id: "halfDay",
        Header: "Half Day",
        accessor: str => showFullString(str.halfDay),
        minWidth: 90,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "duration",
        Header: "Duration",
        accessor: str => str.leaveDuration + " day(s)",
        minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveStatus",
        Header: "Leave Status",
        accessor: str => getLeaveStatusDesc(str.leaveStatus),
        minWidth: 150,
        sortable: true,
        filterable: true
      },
      {
        id: "Action",
        Header: "Action",
        accessor: viewButton => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to={`/leaverequests/view/${viewButton.id.emplid}/${formatDateYMD(
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

    // const showFullStatus = strStatus => {
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

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave Requests</h3>
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
                      exportTableToExcel("table-to-xls", "LeaveRequests")
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
                data={this.state.leaveRequestData}
                columns={leaveRequestsCols}
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
                loadingText="Loading Leave Requests List..."
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
              <ExportToExcel
                leaveRequestData={this.state.filteredData}
                leaveStatusLookup={this.state.leaveStatusLookup}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(LeaveRequestsList);
