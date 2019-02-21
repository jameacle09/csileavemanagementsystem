import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  fetchData,
  isManagerRole,
  formatDateYMD,
  formatDateDMY
} from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import "../common/Styles.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class LeaveRequestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveRequestData: []
    };
    this.loadLeaveRequestList = this.loadLeaveRequestList.bind(this);
  }

  componentDidMount() {
    this.loadLeaveRequestList();
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
          leaveRequestData: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
        width: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "name",
        Header: "Employee Name",
        accessor: "employeeDetails.name",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "jobTitle",
        Header: "Job Title",
        accessor: "employeeDetails.jobTitle",
        minWidth: 120,
        sortable: true,
        filterable: true
      },
      {
        id: "startDate",
        Header: "Start Date",
        accessor: d => formatDateDMY(d.id.startDate),
        minWidth: 94,
        sortable: true,
        filterable: true
      },
      {
        id: "endDate",
        Header: "End Date",
        accessor: d => formatDateDMY(d.endDate),
        minWidth: 94,
        sortable: true,
        filterable: true
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
        id: "halfDay",
        Header: "Half Day",
        accessor: str => showFullString(str.halfDay),
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Duration",
        Header: "Duration",
        accessor: str => str.leaveDuration + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
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
            <span className="fa fa-folder-open" style={{ color: "white" }} />
            &nbsp;View
          </Button>
        ),
        minWidth: 72,
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
            <h3 className="headerStyle">Leave Requests List</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <ReactTable
            data={this.state.leaveRequestData}
            columns={leaveRequestsCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            loadingText="Loading Employe Profiles..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(LeaveRequestsList);
