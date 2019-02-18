import React, { Component } from "react";
import { Table } from "reactstrap";
// import ManagerSideBar from "./ManagerSideBar";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import Moment from "react-moment";
// import 'moment-timezone';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  fetchData,
  isManagerRole,
  formatDateYMD,
  formatDateDMY
} from "../util/APIUtils";

class StaffLeaveHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaveHistory: []
    };
  }
  loadHistoryData() {
    // fetch leave request from API
    const thisYear = new Date().getFullYear();
    fetchData({
      url: API_BASE_URL + "/appliedleave/me/" + thisYear,
      method: "GET"
    })
      .then(data => this.setState({ leaveHistory: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let leaveHistory = [];
        this.setState({ leaveHistory: leaveHistory });
      });
  }
  componentDidMount() {
    this.loadHistoryData();
  }
  render() {
    if (!isManagerRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const leaveHistoryCols = [
      {
        id: "name",
        Header: "Employee Name",
        accessor: "employeeDetails.name",
        minWidth: 140,
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
        id: "leaveStatus",
        Header: "Status",
        accessor: "leaveStatus",
        minWidth: 140,
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
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave History</h3>
          </span>
        </div>
        <br />
        <div className="reactTableContainer">
          <ReactTable
            data={this.state.leaveHistory}
            columns={leaveHistoryCols}
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
          </div>
        {/* <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.leaveRequest.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.employeeDetails.name}</td>
                    <td>{item.leaveCategory.leaveDescr}</td>
                    <td>{item.leaveStatus}</td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.id.startDate}</Moment>
                    </td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.endDate}</Moment>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div> */}
      </div>
    );
  }
}

export default withRouter(StaffLeaveHistory);
