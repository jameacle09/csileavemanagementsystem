import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactTable from "react-table";
// import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import "react-table/react-table.css";
import { fetchData, formatDateDMY } from "../util/APIUtils";

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
        minWidth: 140,
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
        minWidth: 70,
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
        Header: "Available",
        accessor: str => str.availableLeave + " day(s)",
        minWidth: 100,
        sortable: true,
        filterable: true
      },
      {
        id: "takenLeave",
        Header: "Taken",
        accessor: str => str.takenLeave + " day(s)",
        minWidth: 100,
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
            to={`/publicholiday/edit/${formatDateDMY(editButton.holidayDate)}`}
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
        <br />
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
            // rowsText="Rows per page"
            loadingText="Loading Leave History..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
        {/* <div className="tableContainerFlex">
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", color: "white" }}
            >
              <span
                className="fa fa-upload"
                style={{ margin: "0px 10px 0px 0px" }}
              />{" "}
              Upload Entitlement
            </Button>
            <br />
            <br />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>CSI Staff ID</th>
                <th>Staff Name</th>
                <th>Leave Year</th>
                <th>Leave Type</th>
                <th>Carried Forward</th>
                <th>Entitlement</th>
                <th>Available Leave</th>
                <th>Taken Leave</th>
                <th>Balance Leave</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}> 
                      <td>{item.id.emplid}</td>
                      <td>{item.employeeDetails.name}</td>
                      <td>{item.id.year}</td>
                      <td>{item.leaveCategory.leaveDescr}</td>
                      <td>{item.carryForward} days</td>
                      <td>{item.entitlement} days</td>
                      <td>{item.availableLeave} days</td>
                      <td>{item.takenLeave} days</td>
                      <td>{item.balanceLeave} days</td>
                      <td><Button
                        component={Link}
                        to={`/leaveentitlement/edit/${item.id.emplid}`}
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none", color: "white" }}
                      >
                        <span className="fa fa-edit" />
                      </Button></td>
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

export default withRouter(LeaveEntitlement);
