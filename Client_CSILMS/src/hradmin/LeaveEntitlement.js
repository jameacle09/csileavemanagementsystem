import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { isHrRole } from "../util/APIUtils";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ExportToExcel from "./LeaveEntitlementToExcel";

class LeaveEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveEntitlementData: [],
      loading: true
    };
  }
  _isMounted = false;

  loadLeaveEntitlement = () => {
    fetchData({
      url: API_BASE_URL + "/leaveentitlements",
      method: "GET"
    })
      .then(data => {
        this.setState({
          leaveEntitlementData: data,
          loading: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        this.setState({
          leaveEntitlementData: [],
          loading: false
        });
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadLeaveEntitlement();
  }

  componentWillMount() {
    this._isMounted = false;
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadLeaveEntitlement();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }
    const leaveEntitlementCols = [
      {
        id: "emplid",
        Header: "Employee ID",
        accessor: "id.emplid",
        minWidth: 100,
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
        id: "carryForward",
        Header: "Carried Forward",
        accessor: str => str.carryForward + " day(s)",
        minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: str => str.entitlement + " day(s)",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "availableLeave",
        Header: "Available Leave",
        accessor: str => str.availableLeave + " day(s)",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "takenLeave",
        Header: "Taken Leave",
        accessor: str => str.takenLeave + " day(s)",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "balanceLeave",
        Header: "Balance Leave",
        accessor: str => str.balanceLeave + " day(s)",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Action",
        Header: "Action",
        accessor: editButton => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to={`/leaveentitlement/edit/${editButton.id.emplid}/${
              editButton.id.year
            }/${editButton.leaveCategory.leaveCode}`}
            activeclassname="active"
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" style={{ color: "white" }} />
            &nbsp;Edit
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
            <h3 className="headerStyle">Leave Entitlements</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <ExportToExcel
                leaveEntitlementData={this.state.leaveEntitlementData}
              />
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                className="largeButtonOverride"
                // component={Link}
                tag={Link}
                to={`/leaveentitlement/uploadentitlement`}
              >
                <span
                  className="fa fa-upload"
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Upload Entitlements
              </Button>
              <span> </span>
              <Button
                tag={Link}
                to={`/leaveentitlement/add`}
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add Entitlement
              </Button>
            </Col>
          </Row>
          <ReactTable
            data={this.state.leaveEntitlementData}
            columns={leaveEntitlementCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            loadingText="Loading Leave Entitlements..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(LeaveEntitlement);
