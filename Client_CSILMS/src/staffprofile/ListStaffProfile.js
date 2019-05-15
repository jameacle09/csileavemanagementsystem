import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isHrRole, exportTableToExcel } from "../util/APIUtils";
import { fetchData, formatDateDMY } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./StaffProfilesToExcel";
import LoadingPage from "../common/LoadingPage";

class ListStaffProfile extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      statusLookup: [],
      employeeProfiles: [],
      filteredProfiles: [],
      filteredLength: 0,
      loading: true
    };
  }

  componentWillMount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadEmployeeDetails();
    this.loadStatusLookup();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadEmployeeDetails();
    }
  }

  loadEmployeeDetails = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => {
        if (this._isMounted) {
          this.setState({
            employeeProfiles: data
          });
          this.populateFilteredProfiles();
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
        if (this._isMounted) {
          this.setState({
            employeeProfiles: [],
            filteredProfiles: [],
            filteredLength: 0,
            loading: false
          });
        }
      });
  };

  populateFilteredProfiles = () => {
    // This will initialize values for the State Filtered Profiles
    const arrFilteredProfiles = [...this.state.employeeProfiles];
    arrFilteredProfiles.forEach(empRow => {
      empRow["LineMgrID"] = empRow.reportsTo.emplId;
      empRow["LineMgrName"] = empRow.reportsTo.name;
    });
    this.setState({
      filteredProfiles: arrFilteredProfiles,
      filteredLength: arrFilteredProfiles.length,
      loading: false
    });
  };

  loadStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/status",
      method: "GET"
    })
      .then(data => this.setState({ statusLookup: data }))
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
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    // const showStatusDesc = strStatus => {
    //   if (strStatus === "A") {
    //     return "Active";
    //   } else {
    //     return "Inactive";
    //   }
    // };

    const getStatusDesc = strStatus => {
      let arrStatusDescLookup = this.state.statusLookup;
      let stsDesc = "";
      arrStatusDescLookup.forEach(statusDesc => {
        if (statusDesc.id.fieldvalue === strStatus) {
          return (stsDesc = statusDesc.xlatlongname);
        }
      });
      return stsDesc;
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
        minWidth: 180,
        sortable: true,
        filterable: true
      },
      {
        id: "businessEmail",
        Header: "Business Email",
        accessor: "businessEmail",
        minWidth: 190,
        sortable: true,
        filterable: true
      },
      {
        id: "marriageStatus",
        Header: "MStatus",
        accessor: "marriageStatus",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
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
        id: "deptId",
        Header: "Dept ID",
        accessor: "deptId",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "LineMgrName",
        Header: "Line Manager",
        accessor: "reportsTo.name",
        minWidth: 170,
        sortable: true,
        filterable: true
      },
      {
        id: "DateJoined",
        Header: "Join Date",
        accessor: d => formatDateDMY(d.joinDate),
        minWidth: 90,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "status",
        Header: "Status",
        accessor: str => getStatusDesc(str.status),
        minWidth: 70,
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
        },
        show: false
      },
      {
        id: "joinDate",
        Header: "Join Date",
        accessor: "joinDate",
        show: false
      },
      {
        id: "gender",
        Header: "Gender",
        accessor: "gender",
        show: false
      },
      {
        id: "marriageCount",
        Header: "MarriageCount",
        accessor: "marriageCount",
        show: false
      },

      {
        id: "marriageDate",
        Header: "MarriageDate",
        accessor: "marriageDate",
        show: false
      },
      {
        id: "nricPassport",
        Header: "NRIC/Passport No.",
        accessor: "nricPassport",
        show: false
      },
      {
        id: "reportDottedLine",
        Header: "ReportDottedLine",
        accessor: "reportDottedLine",
        show: false
      },
      {
        id: "totalChildren",
        Header: "TotalChildren",
        accessor: "totalChildren",
        show: false
      },
      {
        id: "LineMgrID",
        Header: "Line Manager ID",
        accessor: "reportsTo.emplId",
        show: false
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

        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <div className="reactTableContainer">
              <div className="mainListBtnContainer">
                <div className="SubListBtnLeftContainer">
                  <Button
                    variant="contained"
                    color="primary"
                    className="largeButtonOverride"
                    // onClick={() =>
                    //   document.getElementById("test-table-xls-button").click()
                    // }
                    onClick={() =>
                      exportTableToExcel("table-to-xls", "EmployeeProfiles")
                    }
                  >
                    <span
                      className="fa fa-file-excel-o"
                      style={{ margin: "0px 5px 0px 0px" }}
                    />
                    Export List to Excel
                  </Button>
                </div>
                <div className="SubListBtnRightContainer">
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="largeButtonOverride"
                      component={Link}
                      tag={Link}
                      to={`/liststaffprofile/multipleupdate`}
                    >
                      <span
                        className="fa fa-edit"
                        style={{ margin: "0px 5px 0px 0px" }}
                      />
                      Update Multiple Profiles
                    </Button>
                  </div>
                  <div style={{ paddingLeft: "4px" }}>
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
                        style={{ margin: "0px 5px 0px 0px" }}
                      />
                      Upload Profiles
                    </Button>
                  </div>
                  <div style={{ paddingLeft: "4px" }}>
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
                  </div>
                </div>
              </div>
              <ReactTable
                // key={this.state.filteredLength}
                data={this.state.employeeProfiles}
                columns={EmplProfileCols}
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
                loadingText="Loading Employee Profiles..."
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
                    filteredProfiles: filteredData,
                    filteredLength: filteredDataLength
                  });
                }}
              />
              <ExportToExcel employeeProfiles={this.state.filteredProfiles} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(ListStaffProfile);
