import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole } from "../util/APIUtils";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./StaffProfilesToExcel";

class ListStaffProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeProfiles: [],
      loading: true
    };
  }
  _isMounted = false;

  loadEmployeeDetails = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => {
        this.setState({
          employeeProfiles: data,
          loading: false
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        this.setState({
          employeeProfiles: [],
          loading: false
        });
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadEmployeeDetails();
  }

  componentWillMount() {
    this._isMounted = false;
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadEmployeeDetails();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const showStatusDesc = strStatus => {
      if (strStatus === "A") {
        return "Active";
      } else {
        return "Inactive";
      }
    };

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
      // {
      //   id: "nricPassport",
      //   Header: () => (
      //     <span className="tableHeaderStyle">NRIC/Passport No.</span>
      //   ),
      //   accessor: "nricPassport",
      //   sortable: true,
      //   filterable: true
      // },
      {
        id: "jobTitle",
        Header: "Job Title",
        accessor: "jobTitle",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "mobileNo",
        Header: "Mobile No.",
        accessor: "mobileNo",
        minWidth: 110,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "businessUnit",
        Header: "BU",
        accessor: "businessUnit",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
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
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "status",
        Header: "Status",
        accessor: str => showStatusDesc(str.status),
        minWidth: 60,
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
            to={`/liststaffprofile/edit/${editButton.emplId}`}
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" /> Edit
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
            <h3 className="headerStyle">Employee Profiles</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <ExportToExcel employeeProfiles={this.state.employeeProfiles}>
                <span
                  className="fa fa-file-excel"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
              </ExportToExcel>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                className="largeButtonOverride"
                component={Link}
                tag={Link}
                to={`/liststaffprofile/uploadprofiles`}
              >
                <span
                  className="fa fa-upload"
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Upload Profiles
              </Button>
              <span> </span>
              <Button
                color="primary"
                // component={Link}
                tag={Link}
                to={`/liststaffprofile/add`}
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
            loadingText="Loading Employee Profiles..."
            noDataText="No data available."
            className="-striped"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ListStaffProfile);
