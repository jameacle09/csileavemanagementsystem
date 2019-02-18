import React, { Component } from "react";
import { Table, Input, Row, Col, Button } from "reactstrap";
//import Button from "@material-ui/core/Button";
// import StaffTableRow from "./StaffTableRow";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
// import Moment from "react-moment";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./StaffProfilesToExcel";

class ListStaffProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeProfiles: []
    };
    this.loadEmployeeDetails = this.loadEmployeeDetails.bind(this);
  }

  loadEmployeeDetails() {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    }).then(data => {
      this.setState({
        employeeProfiles: data
      });
    });
  }

  componentDidMount() {
    this.loadEmployeeDetails();
  }

  // componentDidUpdate(nextProps) {
  //   if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
  //     this.loadEmployeeDetails();
  //   }
  // }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const EmplProfileCols = [
      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "emplId",
        width: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "name",
        Header: "Employee Name",
        accessor: "name",
        minWidth: 140,
        sortable: true,
        filterable: true
      },
      {
        id: "businessEmail",
        Header: "Business Email",
        accessor: "businessEmail",
        minWidth: 170,
        sortable: true,
        filterable: true
      },
      {
        id: "nricPassport",
        Header: () => (
          <span className="tableHeaderStyle">NRIC/Passport No.</span>
        ),
        accessor: "nricPassport",
        sortable: true,
        filterable: true
      },
      {
        id: "jobTitle",
        Header: "Job Title",
        accessor: "jobTitle",
        minWidth: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "mobileNo",
        Header: "Mobile No.",
        accessor: "mobileNo",
        minWidth: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "businessUnit",
        Header: "BU",
        accessor: "businessUnit",
        minWidth: 80,
        sortable: true,
        filterable: true
      },
      {
        id: "reportsTo",
        Header: "Line Manager",
        accessor: "reportsTo.name",
        sortable: true,
        filterable: true
      },
      {
        id: "joinDate",
        Header: "Join Date",
        accessor: d => formatDateDMY(d.joinDate),
        minWidth: 94,
        sortable: true,
        filterable: true
      },
      {
        id: "Action",
        Header: "Action",
        accessor: editButton => (
          <Button
            color="primary"
            size="sm"
            tag={Link}
            to={`/liststaffprofile/edit/${editButton.emplId}`}
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" />
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
            <h3 className="headerStyle">Employee Profile</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              {/* <Button component={Link} to="" className="largeButtonOverride">
                <span
                  className="fa fa-file-excel"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Export to Excel
              </Button> */}
              <ExportToExcel employeeProfiles={this.state.employeeProfiles}>
                <span
                  className="fa fa-file-excel"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
              </ExportToExcel>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                color="primary"
                component={Link}
                to="/newstaffprofile"
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add Employee
              </Button>
            </Col>
          </Row>
          <ReactTable
            data={this.state.employeeProfiles}
            columns={EmplProfileCols}
            defaultPageSize={10}
            pages={this.state.pages}
            loading={this.state.loading}
            filterable={true}
            sortable={true}
            multiSort={true}
            // rowsText="Rows per page"
            loadingText="Loading Employe Profiles..."
            noDataText="No data available."
            className="-striped"
          >
            {/* {(state, filteredData, instance) => {
              // console.log("PageRows", state.pageRows);
              this.reactTable = state.pageRows.map(employeeProfile => {
                return employeeProfile._original;
              });
              return (
                <div>
                  {filteredData()}
                  <ExportToExcel employeeProfiles={this.reactTable} />
                </div>
              );
            }} */}
          </ReactTable>
        </div>
      </div>
    );
  }
}

export default withRouter(ListStaffProfile);
