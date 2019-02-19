import React, { Component } from "react";
import ReactTable from "react-table";
import { API_BASE_URL } from '../constants';
import { withRouter } from 'react-router-dom';
import "react-table/react-table.css";
import {
  fetchData,
  formatDateDMY
} from "../util/APIUtils";

class MyLeaveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
    this.loadMyLeaveDetails = this.loadMyLeaveDetails.bind(this);
  }

  loadMyLeaveDetails() {
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = [];
      this.setState({ userData: userData });
    });
  }

  componentDidMount() {
    this.loadMyLeaveDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveDetails();
    }
  }

  render() {
    const myLeaveDetailsCols = [
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "leaveCategory.leaveDescr",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: str => str.entitlement + " day(s)",
        minWidth: 94,
        sortable: true,
        filterable: true
      },
      {
        id: "carryForward",
        Header: "Carry Forward",
        accessor: str => str.carryForward + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "availableLeave",
        Header: "Carry Forward",
        accessor: str => str.availableLeave + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "takenLeave",
        Header: "Taken Leave",
        accessor: str => str.takenLeave + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "balanceLeave",
        Header: "Balance Leave",
        accessor: str => str.balanceLeave + " day(s)",
        minWidth: 140,
        sortable: true,
        filterable: true
      }
    ]
    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave Details</h3>
          </span>
        </div>
        <br />
        <div className="reactTableContainer">
        <ReactTable
            data={this.state.userData}
            columns={myLeaveDetailsCols}
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
                <th>Leave Type</th>
                <th>Entitlement</th>
                <th>Carry Forward</th>
                <th>Available</th>
                <th>Taken</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.leaveCategory.leaveDescr}</td>
                      <td>{item.entitlement} days</td>
                      <td>{item.carryForward} days</td>
                      <td>{item.availableLeave} days</td>
                      <td>{item.takenLeave} days</td>
                      <td>{item.balanceLeave} days</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div> */}
      </div>
    );
  }
}

export default withRouter(MyLeaveDetails);