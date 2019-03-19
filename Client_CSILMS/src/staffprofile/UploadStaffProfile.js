import React, { Component } from "react";
import { Button, Form, FormText, Label, Input, Col } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import {
  fetchData,
  isHrRole,
  formatDateYMD,
  formatDateDMY
} from "../util/APIUtils";
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
      // statusLookup: [],
      // roleLookup: [],
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
    // this.loadStatusLookup();
    // this.loadRoleLookup();
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

  // loadStatusLookup = () => {
  //   fetchData({
  //     url: API_BASE_URL + "/translateitem/status",
  //     method: "GET"
  //   })
  //     .then(data => this.setState({ statusLookup: data }))
  //     .catch(error => {
  //       if (error.status === 401) {
  //         this.props.history.push("/login");
  //       } else {
  //         confirmAlert({
  //           message: error.status + " : " + error.message,
  //           buttons: [
  //             {
  //               label: "OK"
  //             }
  //           ]
  //         });
  //       }
  //     });
  // };

  // loadRoleLookup = () => {
  //   fetchData({
  //     url: API_BASE_URL + "/translateitem/role",
  //     method: "GET"
  //   })
  //     .then(data => this.setState({ roleLookup: data }))
  //     .catch(error => {
  //       if (error.status === 401) {
  //         this.props.history.push("/login");
  //       } else {
  //         confirmAlert({
  //           message: error.status + " : " + error.message,
  //           buttons: [
  //             {
  //               label: "OK"
  //             }
  //           ]
  //         });
  //       }
  //     });
  // };

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
    // let arrStatusLookup = this.state.statusLookup;
    // let arrRoleLookup = this.state.roleLookup;
    let arrEmployeeProfileDataLookup = this.state.employeeProfileData;
    let arrEmployeeProfileData = this.state.employeeProfileData;

    arrEmployeeProfileData.forEach(empRow => {
      empRow["ValidateStatus"] = "Passed!";
      // empRow["RoleName"] = "";
    });

    // Remove Leading and Trailing Spaces
    arrEmployeeProfileData.map(empRow => {
      if (empRow.BusinessEmail)
        empRow.BusinessEmail = empRow.BusinessEmail.trim();
      if (empRow.BusinessUnit) empRow.BusinessUnit = empRow.BusinessUnit.trim();
      if (empRow.DateJoined) empRow.DateJoined = empRow.DateJoined.trim();
      if (empRow.DateMarried) empRow.DateMarried = empRow.DateMarried.trim();
      if (empRow.DepartmentID) empRow.DepartmentID = empRow.DepartmentID.trim();
      if (empRow.DottedLineManager)
        empRow.DottedLineManager = empRow.DottedLineManager.trim();
      if (empRow.EmployeeID) empRow.EmployeeID = empRow.EmployeeID.trim();
      if (empRow.EmployeeName) empRow.EmployeeName = empRow.EmployeeName.trim();
      if (empRow.Gender) empRow.Gender = empRow.Gender.trim();
      if (empRow.JobTitle) empRow.JobTitle = empRow.JobTitle.trim();
      if (empRow.LineManager) empRow.LineManager = empRow.LineManager.trim();
      if (empRow.MaritalStatus)
        empRow.MaritalStatus = empRow.MaritalStatus.trim();
      if (empRow.NRICPassportNo)
        empRow.NRICPassportNo = empRow.NRICPassportNo.trim();
      // if (empRow.Role) empRow.Role = empRow.Role.trim();
      if (empRow.Status) empRow.Status = empRow.Status.trim();
      if (empRow.isManager) empRow.isManager = empRow.isManager.trim();
      if (empRow.isAdmin) empRow.isAdmin = empRow.isAdmin.trim();
      return true;
    });

    // Column Values Validations on each Row
    arrEmployeeProfileData.forEach((empRow, index) => {
      if (empRow.EmployeeID === "") {
        empRow.ValidateStatus = "Employee ID cannot be blank.";
      } else if (
        empRow.EmployeeID !== "" &&
        arrEmployeeProfileDataLookup.filter(
          dupRow => dupRow.EmployeeID === empRow.EmployeeID
        ).length > 1
      ) {
        empRow.ValidateStatus = "Employee ID has duplicate entry.";
      } else if (
        empRow.EmployeeID !== "" &&
        arrEmployeeProfileLookup.some(empProfile => {
          return empProfile.emplId === empRow.EmployeeID;
        })
      ) {
        empRow.ValidateStatus = "Employee ID already exist.";
      } else if (empRow.EmployeeName === "") {
        empRow.ValidateStatus = "Employee Name cannot be blank.";
      } else if (empRow.BusinessEmail === "") {
        empRow.ValidateStatus = "Business Email cannot be blank.";
      } else if (
        empRow.BusinessEmail &&
        !this.validateEmail(empRow.BusinessEmail)
      ) {
        empRow.ValidateStatus = "Business Email format is invalid.";
      } else if (
        empRow.BusinessEmail !== "" &&
        arrEmployeeProfileDataLookup.filter(
          dupRow => dupRow.BusinessEmail === empRow.BusinessEmail
        ).length > 1
      ) {
        empRow.ValidateStatus = "Business Email has duplicate entry.";
      } else if (
        this.validateEmail(empRow.BusinessEmail) &&
        arrEmployeeProfileLookup.some(empProfile => {
          return empProfile.businessEmail === empRow.BusinessEmail;
        })
      ) {
        empRow.ValidateStatus = "Business Email already exist.";
      } else if (empRow.NRICPassportNo === "") {
        empRow.ValidateStatus = "NRIC/Passport# cannot be blank.";
      } else if (empRow.Gender === "") {
        empRow.ValidateStatus = "Gender cannot be blank.";
      } else if (
        empRow.Gender &&
        !arrGenderLookup.some(gender => {
          return gender.id.fieldvalue === empRow.Gender;
        })
      ) {
        empRow.ValidateStatus = "Gender value does not exist.";
      } else if (empRow.MaritalStatus === "") {
        empRow.ValidateStatus = "Marital Status cannot be blank.";
      } else if (
        empRow.MaritalStatus !== "" &&
        !arrMaritalStatusLookup.some(maritalStatus => {
          return maritalStatus.id.fieldvalue === empRow.MaritalStatus;
        })
      ) {
        empRow.ValidateStatus = "Marital Status value does not exist.";
      } else if (empRow.MaritalStatus === "MAR" && empRow.DateMarried === "") {
        empRow.ValidateStatus = "Date Married cannot be blank.";
      } else if (
        empRow.MaritalStatus !== "MAR" &&
        (empRow.DateMarried !== "" &&
          typeof arrEmployeeProfileData[index].DateMarried === "string")
      ) {
        empRow.ValidateStatus = "Date Married should be blank.";
      } else if (
        empRow.DateMarried !== "" &&
        typeof arrEmployeeProfileData[index].DateMarried === "string" &&
        isNaN(Date.parse(empRow.DateMarried))
      ) {
        empRow.ValidateStatus = "Date Married value is invalid.";
      } else if (typeof empRow.MarriedCount !== "number") {
        empRow.ValidateStatus = "Married Count value is invalid.";
      } else if (
        !isNaN(Date.parse(empRow.DateMarried)) &&
        typeof empRow.MarriedCount === "number" &&
        empRow.MarriedCount < 1
      ) {
        empRow.ValidateStatus = "Married Count shouldn't be < 1.";
      } else if (
        empRow.DateMarried !== "" &&
        typeof arrEmployeeProfileData[index].DateMarried === "string" &&
        empRow.MarriedCount === 0
      ) {
        empRow.ValidateStatus = "Married Count value shouldn't be zero.";
      } else if (typeof empRow.ChildrenCount !== "number") {
        empRow.ValidateStatus = "Children Count value is invalid.";
      } else if (empRow.JobTitle === "") {
        empRow.ValidateStatus = "Job Title cannot be blank.";
      } else if (
        empRow.JobTitle !== "" &&
        !arrJobTitleLookup.some(jobTitle => {
          return jobTitle.id.fieldvalue === empRow.JobTitle;
        })
      ) {
        empRow.ValidateStatus = "Job Title value does not exist.";
      } else if (empRow.MobileNo === "") {
        empRow.ValidateStatus = "Mobile Number cannot be blank.";
      } else if (empRow.BusinessUnit === "") {
        empRow.ValidateStatus = "Business Unit cannot be blank.";
      } else if (
        empRow.BusinessUnit !== "" &&
        !arrBusinessUnitLookup.some(businessUnit => {
          return businessUnit.id.fieldvalue === empRow.BusinessUnit;
        })
      ) {
        empRow.ValidateStatus = "Business Unit value does not exist.";
      } else if (empRow.DepartmentID === "") {
        empRow.ValidateStatus = "Department ID cannot be blank.";
      } else if (
        empRow.DepartmentID !== "" &&
        !arrDepartmentIdLookup.some(deptId => {
          return deptId.id.fieldvalue === empRow.DepartmentID;
        })
      ) {
        empRow.ValidateStatus = "Department ID value does not exist.";
      } else if (empRow.LineManager === "") {
        empRow.ValidateStatus = "Line Manager ID cannot be blank.";
      } else if (
        empRow.LineManager !== "" &&
        !arrManagerLookup.some(manager => {
          return manager.emplId === empRow.LineManager;
        })
      ) {
        empRow.ValidateStatus = "Line Manager ID does not exist.";
      } else if (
        typeof empRow.DottedLineManager === "string" &&
        !arrManagerLookup.some(manager => {
          return manager.emplId === empRow.DottedLineManager;
        })
      ) {
        empRow.ValidateStatus = "Dotted LineMgr ID value does not exist.";
      } else if (empRow.DateJoined === "") {
        empRow.ValidateStatus = "Date Joined cannot be blank.";
      } else if (
        empRow.DateJoined !== "" &&
        isNaN(Date.parse(empRow.DateJoined))
      ) {
        empRow.ValidateStatus = "Date Joined value is invalid.";
      } else if (empRow.Status === "") {
        empRow.ValidateStatus = "Status cannot be blank.";
      } else if (empRow.Status !== "A" && empRow.Status !== "I") {
        empRow.ValidateStatus = "Status value is invalid.";
        // } else if (
        //   empRow.Status !== "" &&
        //   !arrStatusLookup.some(status => {
        //     return status.id.fieldvalue === empRow.Status;
        //   })
        // ) {
        //   empRow.ValidateStatus = "Status value does not exist.";
        // } else if (empRow.Role === "") {
        //   empRow.ValidateStatus = "Role cannot be blank.";
        // } else if (
        //   empRow.Role !== "" &&
        //   !arrRoleLookup.some(role => {
        //     if (role.id.fieldvalue === empRow.Role)
        //       empRow.RoleName = role.xlatlongname;
        //     return role.id.fieldvalue === empRow.Role;
        //   })
        // ) {
        //   empRow.ValidateStatus = "Role value does not exist.";
        // }
      } else if (empRow.isManager === "") {
        empRow.ValidateStatus = "isManager cannot be blank.";
      } else if (empRow.isManager !== "Y" && empRow.isManager !== "N") {
        empRow.ValidateStatus = "isManager value is invalid.";
      } else if (empRow.isAdmin === "") {
        empRow.ValidateStatus = "isAdmin cannot be blank.";
      } else if (empRow.isAdmin !== "Y" && empRow.isAdmin !== "N") {
        empRow.ValidateStatus = "isAdmin value is invalid.";
      }

      if (empRow.DateMarried !== "" && !isNaN(Date.parse(empRow.DateMarried)))
        empRow.DateMarried = formatDateYMD(empRow.DateMarried);
      if (empRow.DateJoined !== "" && !isNaN(Date.parse(empRow.DateJoined)))
        empRow.DateJoined = formatDateYMD(empRow.DateJoined);
    });

    // Detecting for disappeared Column Names due to empty values
    arrEmployeeProfileData.map((empRow, index) => {
      if (typeof arrEmployeeProfileData[index].EmployeeID !== "string") {
        empRow.ValidateStatus = "Employee ID cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].EmployeeName !== "string"
      ) {
        empRow.ValidateStatus = "Employee Name cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].BusinessEmail !== "string"
      ) {
        empRow.ValidateStatus = "Business Email cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].NRICPassportNo !== "string"
      ) {
        empRow.ValidateStatus = "NRICPassport# cannot be blank.";
      } else if (typeof arrEmployeeProfileData[index].Gender !== "string") {
        empRow.ValidateStatus = "Gender cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].MaritalStatus !== "string"
      ) {
        empRow.ValidateStatus = "Marital Status cannot be blank.";
      } else if (
        arrEmployeeProfileData[index].MaritalStatus === "MAR" &&
        typeof arrEmployeeProfileData[index].DateMarried !== "string"
      ) {
        empRow.ValidateStatus = "Date Married cannot be blank.";
      } else if (typeof arrEmployeeProfileData[index].JobTitle !== "string") {
        empRow.ValidateStatus = "Job Title cannot be blank.";
      } else if (
        !arrEmployeeProfileData[index].MobileNo &&
        typeof arrEmployeeProfileData[index].MobileNo !== "string"
      ) {
        empRow.ValidateStatus = "Mobile Number cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].BusinessUnit !== "string"
      ) {
        empRow.ValidateStatus = "Business Unit cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].DepartmentID !== "string"
      ) {
        empRow.ValidateStatus = "Department ID cannot be blank.";
      } else if (
        typeof arrEmployeeProfileData[index].LineManager !== "string"
      ) {
        empRow.ValidateStatus = "Line Manager ID cannot be blank.";
      } else if (typeof arrEmployeeProfileData[index].DateJoined !== "string") {
        empRow.ValidateStatus = "Date Joined cannot be blank.";
      } else if (typeof arrEmployeeProfileData[index].Status !== "string") {
        empRow.ValidateStatus = "Status cannot be blank.";
        // } else if (typeof arrEmployeeProfileData[index].Role !== "string") {
        //   empRow.ValidateStatus = "Role cannot be blank.";
        // }
      } else if (typeof arrEmployeeProfileData[index].isManager !== "string") {
        empRow.ValidateStatus = "isManager cannot be blank.";
      } else if (typeof arrEmployeeProfileData[index].isAdmin !== "string") {
        empRow.ValidateStatus = "isAdmin cannot be blank.";
      }

      return true;
    });

    let arrErrEmployeeProfileData = arrEmployeeProfileData.filter(
      empRow => empRow.ValidateStatus !== "Passed!"
    );

    if (arrEmployeeProfileData.length === 0) {
      this.setState({
        employeeProfileData: arrErrEmployeeProfileData,
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
          "Invalid row/s has/have been detected in the uploaded Employee Profile data! Please find those in the table and fix them in Excel Template, then re-try uploading...",
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
      let empProfRoles = this.getEmployeeProfileRoles(
        empRow.isManager,
        empRow.isAdmin
      );
      if (!empRow.DottedLineManager) empRow.DottedLineManager = " ";
      const jsonRowValues = {
        emplId: empRow.EmployeeID,
        name: empRow.EmployeeName,
        effectiveDate: formatDateYMD(new Date()),
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
        roles: empProfRoles
      };

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
      return true;
    });
    // this.props.history.push("/liststaffprofile");
    this.handleReset();
  };

  getEmployeeProfileRoles = (isManager, isAdmin) => {
    let empRoles = [];
    empRoles.push({ role: "E", roleName: "EMPLOYEE" });
    if (isManager === "Y") empRoles.push({ role: "M", roleName: "MANAGER" });
    if (isAdmin === "Y") empRoles.push({ role: "A", roleName: "HR" });

    return empRoles;
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
    // if (!isHrRole(this.props.currentUser)) {
    //   return <Redirect to="/forbidden" />;
    // }

    let textHeaderValue = "",
      textColorValStatus = "",
      colWidthValStatus = 0;
    if (this.state.isValid) {
      textHeaderValue = "Validation";
      textColorValStatus = "#004a9b";
      colWidthValStatus = 90;
    } else {
      textHeaderValue = "Validation Status";
      textColorValStatus = "red";
      colWidthValStatus = 280;
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
        minWidth: 190,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "left"
        }
      },
      {
        id: "NRICPassportNo",
        Header: "NRIC/Passport#",
        accessor: "NRICPassportNo",
        minWidth: 140,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Gender",
        Header: "Gender",
        accessor: "Gender",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "MaritalStatus",
        Header: "Marital",
        accessor: "MaritalStatus",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "DateMarried",
        Header: "DateMarried",
        accessor: d => {
          if (d.DateMarried) {
            return formatDateDMY(d.DateMarried);
          } else {
            return " ";
          }
        },
        minWidth: 110,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "MarriedCount",
        Header: "MCnt",
        accessor: "MarriedCount",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "ChildrenCount",
        Header: "ChildCnt",
        accessor: "ChildrenCount",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "JobTitle",
        Header: "JobTitle",
        accessor: "JobTitle",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "MobileNo",
        Header: "MobileNo",
        accessor: "MobileNo",
        minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "BusinessUnit",
        Header: "BU",
        accessor: "BusinessUnit",
        minWidth: 80,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "DepartmentID",
        Header: "DeptID",
        accessor: "DepartmentID",
        minWidth: 80,
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
      {
        id: "DottedLineManager",
        Header: "DottedLMgr",
        accessor: "DottedLineManager",
        minWidth: 110,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "DateJoined",
        Header: "DateJoined",
        accessor: d => {
          if (d.DateMarried) {
            return formatDateDMY(d.DateJoined);
          } else {
            return " ";
          }
        },
        minWidth: 100,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Status",
        Header: "Status",
        accessor: "Status",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      // {
      //   id: "Role",
      //   Header: "Role",
      //   accessor: "Role",
      //   minWidth: 70,
      //   sortable: true,
      //   filterable: true,
      //   style: {
      //     textAlign: "center"
      //   }
      // },
      {
        id: "Manager",
        Header: "isManager",
        accessor: "isManager",
        minWidth: 96,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "Admin",
        Header: "isAdmin",
        accessor: "isAdmin",
        minWidth: 82,
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
            <div className="mainListBtnContainer">
              <div className="SubUploadListLeftContainer">
                <div className="SubUploadListLeftContainerA">
                  <Label
                    for="excelFileName"
                    style={{
                      textAlign: "left",
                      fontFamily: "Helvetica",
                      size: "16",
                      fontWeight: "bold"
                    }}
                  >
                    Upload Excel File:
                  </Label>
                </div>
                <div className="SubUploadListLeftContainerB">
                  <Col>
                    <Input
                      type="file"
                      name="filename"
                      id="filename"
                      accept=".xls,.xlsx"
                      value={this.state.filename}
                      onChange={this.handleExcelFileUpload.bind(this)}
                      style={{
                        fontFamily: "Helvetica",
                        size: "16",
                        background: "#b8e2fc",
                        border: "1px solid rgb(214, 209, 209)"
                      }}
                    />
                    <FormText color="muted" style={{ fontFamily: "Helvetica" }}>
                      Please download the latest{" "}
                      <a
                        href={ExcelUploadTemplate}
                        className="uploadTemplateLink"
                      >
                        Employee Profile Upload Template
                      </a>{" "}
                      for you to fill in the data.
                    </FormText>
                  </Col>
                </div>
              </div>
              <div className="SubUploadListRightContainer">
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => this.confirmEmployeeProfileSave(event)}
                    disabled={this.validateStateHasData()}
                    style={{ width: "94px", marginBottom: "2px" }}
                    className="largeButtonOverride"
                  >
                    Save
                  </Button>
                  <span> </span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                    style={{ width: "94px", marginBottom: "2px" }}
                    className="largeButtonOverride"
                  >
                    Reset
                  </Button>
                  <span> </span>
                  <Button
                    color="secondary"
                    onClick={this.handleCancelUpload}
                    style={{ width: "94px", marginBottom: "2px" }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </div>

            <div className="reactTableSubContainer">
              <ReactTable
                data={this.state.employeeProfileData}
                columns={employeeProfileCols}
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                }
                defaultPageSize={10}
                pages={this.state.pages}
                loading={this.state.loading}
                foldable={true}
                filterable={true}
                sortable={true}
                multiSort={true}
                loadingText="Loading Employee Profiles..."
                noDataText="No data uploaded."
                className="-striped"
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadEmployeeProfile);
