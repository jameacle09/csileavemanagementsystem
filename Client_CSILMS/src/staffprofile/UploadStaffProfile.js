import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Col
} from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import XLSX from "xlsx";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExcelUploadTemplate from "../templates/EmployeeProfiles.xlsx";

class UploadEmployeeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeProfileData: [],
      genderLookup: [],
      maritalStatusLookup: [],
      jobTitleLookup: [],
      businessUnitLookup: [],
      departmentIdLookup: [],
      employeeProfileLookup: [],
      managerLookup: [],
      statusLookup: [],
      roleLookup: [],
      filename: "",
      isValid: false,
      loading: false
    };
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.loadGenderLookup();
    this.loadMaritalStatusLookup();
    this.loadJobTitleLookup();
    this.loadBusinessUnitLookup();
    this.loadDepartmentIdLookup();
    this.loadEmployeeProfileLookup();
    this.loadManagerLookup();
    this.loadStatusLookup();
    this.loadRoleLookup();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadGenderLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/gender",
      method: "GET"
    })
      .then(data => this.setState({ genderLookup: data }))
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

  loadMaritalStatusLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/marriage_status",
      method: "GET"
    })
      .then(data => this.setState({ maritalStatusLookup: data }))
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

  loadJobTitleLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/job_title",
      method: "GET"
    })
      .then(data => this.setState({ jobTitleLookup: data }))
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

  loadBusinessUnitLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/business_unit",
      method: "GET"
    })
      .then(data => this.setState({ businessUnitLookup: data }))
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

  loadDepartmentIdLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/dept_id",
      method: "GET"
    })
      .then(data => this.setState({ departmentIdLookup: data }))
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

  loadEmployeeProfileLookup = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => this.setState({ employeeProfileLookup: data }))
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

  loadManagerLookup = () => {
    fetchData({
      url: API_BASE_URL + "/leaveapprovers",
      method: "GET"
    })
      .then(data => this.setState({ managerLookup: data }))
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

  loadRoleLookup = () => {
    fetchData({
      url: API_BASE_URL + "/translateitem/role",
      method: "GET"
    })
      .then(data => this.setState({ roleLookup: data }))
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

  handleExcelFileUpload = file => {
    if (file.target.files[0]) {
      if (!file.target.files[0].name.match(/.(xls|xlsx)$/i)) {
        return confirmAlert({
          message:
            "Invalid Template has been used for uploading Employee Profiles! Please use the latest Upload Template available in this page...",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    }
    if (this._isMounted && file.target.files[0]) {
      /* Update state values for filename and loading */
      this.setState({
        filename: file.target.value,
        loading: true
      });
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = e => {
        /* Parse Entitlement Data */
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get the second worksheet */
        const worksheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[worksheetName];
        /* Convert array of arrays to JSON */
        const uploadData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /* Update State's Entitlement Data */
        this.setState({
          employeeProfileData: uploadData,
          loading: true
        });
        this.validateUploadedRowsData();
      };
      if (rABS) reader.readAsBinaryString(file.target.files[0]);
      else reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      this.setState({
        employeeProfileData: [],
        filename: "",
        isValid: false,
        loading: false
      });
    }
  };

  validateUploadedRowsData = () => {
    let arrGenderLookup = this.state.genderLookup;
    let arrMaritalStatusLookup = this.state.maritalStatusLookup;
    let arrJobTitleLookup = this.state.jobTitleLookup;
    let arrBusinessUnitLookup = this.state.businessUnitLookup;
    let arrDepartmentIdLookup = this.state.departmentIdLookup;
    let arrEmployeeProfileLookup = this.state.employeeProfileLookup;
    let arrManagerLookup = this.state.managerLookup;
    let arrStatusLookup = this.state.statusLookup;
    let arrRoleLookup = this.state.roleLookup;
    let arrEmployeeProfileData = this.state.employeeProfileData;
    arrEmployeeProfileData.forEach(function(e) {
      e["ValidateStatus"] = "Passed";
      e["RoleName"] = "";
    });
    arrEmployeeProfileData.forEach(empRow => {
      if (!empRow.EmployeeID)
        empRow.ValidateStatus = "Employee ID cannot be blank.";
      if (
        empRow.EmployeeID &&
        arrEmployeeProfileLookup.some(empProfile => {
          return empProfile.emplId === empRow.EmployeeID;
        })
      )
        empRow.ValidateStatus = "Employee ID is already taken.";
      if (!empRow.EmployeeName)
        empRow.ValidateStatus = "Employee Name cannot be blank.";
      if (!empRow.BusinessEmail)
        empRow.ValidateStatus = "Business Email cannot be blank.";
      if (!this.validateEmail(empRow.BusinessEmail))
        empRow.ValidateStatus = "Business Email value/format is invalid.";
      if (
        this.validateEmail(empRow.BusinessEmail) &&
        arrEmployeeProfileLookup.some(empProfile => {
          return empProfile.businessEmail === empRow.BusinessEmail;
        })
      )
        empRow.ValidateStatus = "Business Email is already taken.";
      if (!empRow.NRICPassportNo)
        empRow.ValidateStatus = "NRIC/Passport Number cannot be blank.";
      if (!empRow.Gender) empRow.ValidateStatus = "Gender cannot be blank.";
      if (
        empRow.Gender &&
        !arrGenderLookup.some(gender => {
          return gender.id.fieldvalue === empRow.Gender;
        })
      )
        empRow.ValidateStatus = "Gender value does not exist.";
      if (!empRow.MaritalStatus)
        empRow.ValidateStatus = "Marital Status cannot be blank.";
      if (
        empRow.MaritalStatus &&
        !arrMaritalStatusLookup.some(maritalStatus => {
          return maritalStatus.id.fieldvalue === empRow.MaritalStatus;
        })
      )
        empRow.ValidateStatus = "Marital Status value does not exist.";
      if (empRow.DateMarried && isNaN(Date.parse(empRow.DateMarried)))
        empRow.ValidateStatus = "Date Married value is invalid.";
      if (typeof empRow.MarriedCount !== "number")
        empRow.ValidateStatus = "Married Count value is invalid.";
      if (empRow.DateMarried && empRow.MarriedCount === 0)
        empRow.ValidateStatus = "Married Count value shouldn't be zero.";
      if (typeof empRow.ChildrenCount !== "number")
        empRow.ValidateStatus = "Children Count value is invalid.";
      if (!empRow.JobTitle)
        empRow.ValidateStatus = "Job Title cannot be blank.";
      if (
        empRow.JobTitle &&
        !arrJobTitleLookup.some(jobTitle => {
          return jobTitle.id.fieldvalue === empRow.JobTitle;
        })
      )
        empRow.ValidateStatus = "Job Title value does not exist.";
      if (!empRow.MobileNo)
        empRow.ValidateStatus = "Mobile Number cannot be blank.";
      if (!empRow.BusinessUnit)
        empRow.ValidateStatus = "Business Unit cannot be blank.";
      if (
        empRow.BusinessUnit &&
        !arrBusinessUnitLookup.some(businessUnit => {
          return businessUnit.id.fieldvalue === empRow.BusinessUnit;
        })
      )
        empRow.ValidateStatus = "Business Unit value does not exist.";
      if (!empRow.DepartmentID)
        empRow.ValidateStatus = "Department ID cannot be blank.";
      if (
        empRow.DepartmentID &&
        !arrDepartmentIdLookup.some(deptId => {
          return deptId.id.fieldvalue === empRow.DepartmentID;
        })
      )
        empRow.ValidateStatus = "Department ID value does not exist.";
      if (!empRow.LineManager)
        empRow.ValidateStatus = "Line Manager ID cannot be blank.";
      if (
        empRow.LineManager &&
        !arrManagerLookup.some(manager => {
          return manager.emplId === empRow.LineManager;
        })
      )
        empRow.ValidateStatus = "Line Manager ID value does not exist.";
      // if (!empRow.DottedLineManager)
      //   empRow.ValidateStatus = "Dotted Line Manager ID cannot be blank.";
      if (!empRow.DottedLineManager) empRow.DottedLineManager = "";
      if (
        empRow.DottedLineManager &&
        !arrManagerLookup.some(manager => {
          return manager.emplId === empRow.DottedLineManager;
        })
      )
        empRow.ValidateStatus = "Dotted Line Manager ID value does not exist.";
      if (!empRow.DateJoined)
        empRow.ValidateStatus = "Date Joined cannot be blank.";
      if (empRow.DateJoined && isNaN(Date.parse(empRow.DateJoined)))
        empRow.ValidateStatus = "Date Joined value is invalid.";
      if (!empRow.Status) empRow.ValidateStatus = "Status cannot be blank.";
      if (
        empRow.Status &&
        !arrStatusLookup.some(status => {
          return status.id.fieldvalue === empRow.Status;
        })
      )
        empRow.ValidateStatus = "Status value does not exist.";
      if (!empRow.Role) empRow.ValidateStatus = "Role cannot be blank.";
      if (
        empRow.Role &&
        !arrRoleLookup.some(role => {
          if (role.id.fieldvalue === empRow.Role)
            empRow.RoleName = role.xlatlongname;
          return role.id.fieldvalue === empRow.Role;
        })
      )
        empRow.ValidateStatus = "Role value does not exist.";
    });
    let arrErrEmployeeProfileData = arrEmployeeProfileData.filter(
      empRow => empRow.ValidateStatus !== "Passed"
    );

    if (arrEmployeeProfileData.length === 0) {
      this.setState({
        employeeProfileData: arrEmployeeProfileData,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "No rows have been uploaded! Please verify that you are using the correct template and that it contains Employee Profiles data...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (arrErrEmployeeProfileData.length > 0) {
      this.setState({
        employeeProfileData: arrErrEmployeeProfileData,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "Invalid row(s) has/have been detected from the uploaded Employee Profile data! Please find those invalid row(s) in the table and fix them in Excel Template, then re-try uploading...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (
      arrErrEmployeeProfileData.length === 0 &&
      arrEmployeeProfileData.length > 0
    ) {
      this.setState({
        employeeProfileData: arrEmployeeProfileData,
        isValid: true,
        loading: false
      });
      confirmAlert({
        message:
          "All uploaded Employee Profiles data have successfully passed the validation process...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    }
  };

  validateEmail = email => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  confirmEmployeeProfileSave = e => {
    confirmAlert({
      message: "Do you really want to save all uploaded Employee Profiles?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleEmployeeProfileSave(e)
        },
        {
          label: "No"
        }
      ]
    });
  };

  handleEmployeeProfileSave = e => {
    // This is a temporary solution for saving Array of data, an API
    // for saving bulk of data should be created to speed up the saving
    this.state.employeeProfileData.map(empRow => {
      const jsonRowValues = {
        emplId: empRow.EmployeeID,
        name: empRow.EmployeeName,
        effectiveDate: this.getCurrentDate(),
        reportsTo: { emplId: empRow.LineManager, name: "" },
        reportDottedLine: empRow.DottedLineManager,
        businessEmail: empRow.BusinessEmail,
        nricPassport: empRow.NRICPassportNo,
        gender: empRow.Gender,
        marriageStatus: empRow.MaritalStatus,
        marriageCount: empRow.MarriedCount,
        marriageDate: empRow.DateMarried,
        totalChildren: empRow.ChildrenCount,
        jobTitle: empRow.JobTitle,
        mobileNo: empRow.MobileNo,
        businessUnit: empRow.BusinessUnit,
        deptId: empRow.DepartmentID,
        joinDate: empRow.DateJoined,
        status: empRow.Status,
        roles: [{ role: empRow.Role, roleName: empRow.RoleName }]
      };

      console.log(jsonRowValues);
      const postRequest = Object.assign({}, jsonRowValues);
      fetchData({
        url: API_BASE_URL + "/addEditEmployeeDetails",
        method: "POST",
        body: JSON.stringify(postRequest)
      })
        .then(response => {
          // if (response.ok) {
          //   confirmAlert({
          //     message: "Entitlement has been successfully inserted!",
          //     buttons: [
          //       {
          //         label: "OK",
          //         onClick: () => this.props.history.push("/liststaffprofile")
          //       }
          //     ]
          //   });
          // }
        })
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
    });
    this.props.history.push("/liststaffprofile");
  };

  getCurrentDate = () => {
    var date = new Date(),
      month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  completedEntitlementSave = e => {
    confirmAlert({
      message:
        "All new Employee Profiles have been successfully saved to the Database!",
      buttons: [
        {
          label: "OK",
          onClick: () => this.props.history.push("/liststaffprofile")
        }
      ]
    });
  };

  validateStateHasData = () => {
    const isInvalid =
      !this.state.employeeProfileData.length || !this.state.isValid;
    return isInvalid;
  };

  handleReset = () => {
    this.setState({
      employeeProfileData: [],
      filename: "",
      isValid: false,
      loading: false
    });
  };

  handleCancelUpload = () => {
    this.props.history.push("/liststaffprofile");
  };

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    let textHeaderValue = "",
      textColorValStatus = "",
      colWidthValStatus = 0;
    if (this.state.isValid) {
      textHeaderValue = "Validation";
      textColorValStatus = "#004a9b";
      colWidthValStatus = 70;
    } else {
      textHeaderValue = "Validation Status";
      textColorValStatus = "red";
      colWidthValStatus = 260;
    }

    const employeeProfileCols = [
      {
        id: "ValidateStatus",
        Header: textHeaderValue,
        accessor: "ValidateStatus",
        minWidth: colWidthValStatus,
        sortable: true,
        filterable: false,
        style: {
          color: textColorValStatus
        }
      },
      {
        id: "EmployeeID",
        Header: "Employee ID",
        accessor: "EmployeeID",
        minWidth: 110,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "EmployeeName",
        Header: "Employee Name",
        accessor: "EmployeeName",
        minWidth: 180,
        sortable: true,
        filterable: true
      },
      {
        id: "BusinessEmail",
        Header: "Business Email",
        accessor: "BusinessEmail",
        minWidth: 180,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      // {
      //   id: "NRICPassportNo",
      //   Header: "NRIC/Passport#",
      //   accessor: "NRICPassportNo",
      //   minWidth: 140,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      // {
      //   id: "Gender",
      //   Header: "Gender",
      //   accessor: "Gender",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      // {
      //   id: "MaritalStatus",
      //   Header: "Marital",
      //   accessor: "MaritalStatus",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      // {
      //   id: "DateMarried",
      //   Header: "Date Married",
      //   accessor: "DateMarried",
      //   minWidth: 100,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      // {
      //   id: "MarriedCount",
      //   Header: "MCnt",
      //   accessor: "MarriedCount",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      // {
      //   id: "ChildrenCount",
      //   Header: "ChildCnt",
      //   accessor: "ChildrenCount",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      {
        id: "JobTitle",
        Header: "JobTitle",
        accessor: "JobTitle",
        minWidth: 70,
        sortable: true,
        filterable: true,
        foldable: true,
        style: {
          textAlign: "center"
        }
      },
      // {
      //   id: "MobileNo",
      //   Header: "MobileNo",
      //   accessor: "MobileNo",
      //   minWidth: 110,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   },
      //   expander: true
      // },
      // {
      //   id: "BusinessUnit",
      //   Header: "BU",
      //   accessor: "BusinessUnit",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      {
        id: "DepartmentID",
        Header: "DeptID",
        accessor: "DepartmentID",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "LineManager",
        Header: "LineManager",
        accessor: "LineManager",
        minWidth: 110,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      // {
      //   id: "DottedLineManager",
      //   Header: "DottedLineMgr",
      //   accessor: "DottedLineManager",
      //   minWidth: 110,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      {
        id: "DateJoined",
        Header: "DateJoined",
        accessor: "DateJoined",
        minWidth: 100,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      // {
      //   id: "Status",
      //   Header: "Status",
      //   accessor: "Status",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      {
        id: "Role",
        Header: "Role",
        accessor: "Role",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Upload Employee Profiles</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Form>
            <div>
              <FormGroup
                row
                style={{
                  fontFamily: "Helvetica",
                  size: "16",
                  fontWeight: "bold"
                }}
              >
                <Label for="excelFileName" sm={2}>
                  Upload Excel File:
                </Label>

                <Col sm={{ size: 6 }}>
                  <Input
                    type="file"
                    name="filename"
                    id="filename"
                    accept=".xls,.xlsx"
                    value={this.state.filename}
                    onChange={this.handleExcelFileUpload.bind(this)}
                    style={{
                      background: "#b8e2fc",
                      border: "1px solid rgb(214, 209, 209)"
                    }}
                  />
                  <FormText color="muted" style={{ fontFamily: "Helvetica" }}>
                    Please download the latest{" "}
                    <a href={ExcelUploadTemplate}>
                      Employee Profile Upload Template
                    </a>{" "}
                    for you to fill in the data.
                  </FormText>
                </Col>
                <Col sm={4} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => this.confirmEmployeeProfileSave(event)}
                    disabled={this.validateStateHasData()}
                    style={{ width: "100px" }}
                    className="largeButtonOverride"
                  >
                    Save
                  </Button>
                  <span> </span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                    style={{ width: "100px" }}
                    className="largeButtonOverride"
                  >
                    Reset
                  </Button>
                  <span> </span>
                  <Button
                    color="secondary"
                    width="80px"
                    onClick={this.handleCancelUpload}
                  >
                    Back to Main
                  </Button>
                </Col>
              </FormGroup>
            </div>
            <ReactTable
              data={this.state.employeeProfileData}
              columns={employeeProfileCols}
              defaultPageSize={10}
              pages={this.state.pages}
              loading={this.state.loading}
              foldable={true}
              filterable={true}
              sortable={true}
              multiSort={true}
              loadingText="Loading Employee Profiles..."
              noDataText="No data available."
              className="-striped"
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadEmployeeProfile);
