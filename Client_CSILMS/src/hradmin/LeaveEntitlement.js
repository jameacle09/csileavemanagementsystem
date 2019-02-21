import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import "react-table/react-table.css";
import { fetchData } from "../util/APIUtils";

class LeaveEntitlement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [
        // {
        //   joinDate: ""
        // }
      ]
    };
    this.loadLeaveEntitlement = this.loadLeaveEntitlement.bind(this);
  }

  loadLeaveEntitlement() {
    fetchData({
      url: API_BASE_URL + "/leaveentitlements",
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
      console.log(userData);
    });
  }

  componentDidMount() {
    this.loadLeaveEntitlement();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLeaveEntitlement();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }
    const leaveEntitlementCols = [
      {
        id: "emplid",
        Header: "CSI Staff ID",
        accessor: "id.emplid",
        minWidth: 100,
        sortable: true,
        filterable: true
      },
      {
        id: "name",
        Header: "Staff Name",
        accessor: "employeeDetails.name",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "leaveYear",
        Header: "Year",
        accessor: "id.year",
        minWidth: 50,
        sortable: true,
        filterable: true
      },
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "leaveCategory.leaveDescr",
        minWidth: 180,
        sortable: true,
        filterable: true
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: str => str.entitlement + " day(s)",
        minWidth: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "carryForward",
        Header: "Carry Forward",
        accessor: str => str.carryForward + " day(s)",
        minWidth: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "availableLeave",
        Header: "Available",
        accessor: str => str.availableLeave + " day(s)",
        minWidth: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "takenLeave",
        Header: "Taken",
        accessor: str => str.takenLeave + " day(s)",
        minWidth: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "balanceLeave",
        Header: "Balance",
        accessor: str => str.balanceLeave + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: true
      },
      {
        id: "editAction",
        Header: "Edit",
        accessor: editButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/leaveentitlement/edit/${editButton.id.emplid}`}
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" /> Edit
          </Button>
        ),
        minWidth: 70,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ]
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave Entitlement</h3>
          </span>
        </div>
        <div className="reactTableContainer">
        <ReactTable
            data={this.state.userData}
            columns={leaveEntitlementCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            loadingText="Loading Leave History..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(LeaveEntitlement);
