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
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import XLSX from "xlsx";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExcelUploadTemplate from "../templates/LeaveEntitlement.xlsx";

class UploadEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entitlementData: [],
      employeeProfiles: [],
      leaveCategories: [],
      leaveEntitlements: [],
      filename: "",
      isValid: false,
      loading: false
    };
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.loadEmployeeProfilesLookup();
    this.loadLeaveCategoriesLookup();
    this.loadLeaveEntitlementsLookup();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadEmployeeProfilesLookup = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => this.setState({ employeeProfiles: data }))
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

  loadLeaveCategoriesLookup = () => {
    fetchData({
      url: API_BASE_URL + "/leavecategories",
      method: "GET"
    })
      .then(data => this.setState({ leaveCategories: data }))
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

  loadLeaveEntitlementsLookup = () => {
    fetchData({
      url: API_BASE_URL + "/leaveentitlements",
      method: "GET"
    })
      .then(data => {
        this.setState({
          leaveEntitlements: data,
          loading: false
        });
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
  };

  handleExcelFileUpload = file => {
    if (file.target.files[0]) {
      if (!file.target.files[0].name.match(/.(xls|xlsx)$/i)) {
        return confirmAlert({
          message:
            "Invalid Template has been used for uploading Leave Entitlement! Please use the latest Upload Template available in this page...",
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
          entitlementData: uploadData,
          loading: true
        });
        this.validateUploadedRowsData();
      };
      if (rABS) reader.readAsBinaryString(file.target.files[0]);
      else reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      this.setState({
        entitlementData: [],
        filename: "",
        isValid: false,
        loading: false
      });
    }
  };

  validateUploadedRowsData = () => {
    let arrEmployeeProfilesData = this.state.employeeProfiles;
    let arrLeaveCategoriesData = this.state.leaveCategories;
    let arrLeaveEntitlementsData = this.state.leaveEntitlements;
    let arrEntitlementDataLookup = this.state.entitlementData;
    let arrEntitlementData = this.state.entitlementData;

    arrEntitlementData.forEach(entRow => {
      entRow["ValidateStatus"] = "Passed!";
      entRow["EmployeeName"] = "";
    });

    // Remove Leading and Trailing Spaces
    arrEntitlementData.map(entRow => {
      if (entRow.EmployeeID) entRow.EmployeeID = entRow.EmployeeID.trim();
      if (entRow.LeaveType) entRow.LeaveType = entRow.LeaveType.trim();
    });

    // Column Values Validations on each Row
    arrEntitlementData.forEach(entRow => {
      if (!entRow.EmployeeID) {
        // Employee ID
        entRow.ValidateStatus = "Employee ID cannot be blank.";
      } else if (
        entRow.EmployeeID &&
        !arrEmployeeProfilesData.some(empProf => {
          if (empProf.emplId === entRow.EmployeeID)
            entRow.EmployeeName = empProf.name;
          return empProf.emplId === entRow.EmployeeID;
        })
      ) {
        entRow.ValidateStatus = "Employee ID value does not exist.";
      } else if (typeof entRow.LeaveYear !== "number") {
        entRow.ValidateStatus = "Leave Year value is invalid.";
      } else if (("" + entRow.LeaveYear).length !== 4) {
        entRow.ValidateStatus = "Leave Year value length must be 4.";
      } else if (!entRow.LeaveType) {
        entRow.ValidateStatus = "Leave Type cannot be blank.";
      } else if (
        entRow.LeaveType &&
        !arrLeaveCategoriesData.some(leave => {
          return leave.leaveCode === entRow.LeaveType;
        })
      ) {
        entRow.ValidateStatus = "Leave Type value does not exist.";
      } else if (
        entRow.EmployeeID != "" &&
        typeof entRow.LeaveYear === "number" &&
        entRow.LeaveType != "" &&
        arrEntitlementDataLookup.filter(
          dupRow =>
            dupRow.EmployeeID === entRow.EmployeeID &&
            dupRow.LeaveYear === entRow.LeaveYear &&
            dupRow.LeaveType === entRow.LeaveType
        ).length > 1
      ) {
        entRow.ValidateStatus = "This row has duplicate entry.";
      } else if (
        entRow.EmployeeID != "" &&
        typeof entRow.LeaveYear === "number" &&
        entRow.LeaveType != "" &&
        arrLeaveEntitlementsData.some(ent => {
          return (
            ent.id.emplid === entRow.EmployeeID &&
            ent.id.year === entRow.LeaveYear &&
            ent.id.leaveCode === entRow.LeaveType
          );
        })
      ) {
        entRow.ValidateStatus = "This entry already exist.";
      } else if (typeof entRow.CarriedForward !== "number") {
        entRow.ValidateStatus = "Carried Forward value is invalid.";
      } else if (typeof entRow.Entitlement !== "number") {
        entRow.ValidateStatus = "Entitlement value is invalid.";
      } else if (typeof entRow.AvailableLeave !== "number") {
        entRow.ValidateStatus = "Available Leave value is invalid.";
      } else if (typeof entRow.TakenLeave !== "number") {
        entRow.ValidateStatus = "Taken Leave value is invalid.";
      } else if (typeof entRow.BalanceLeave !== "number") {
        entRow.ValidateStatus = "Balance Leave value is invalid.";
      }
    });

    // Detecting for disappeared Column Names due to empty values
    arrEntitlementData.map((entRow, index) => {
      if (typeof arrEntitlementData[index].EmployeeID !== "string") {
        entRow.ValidateStatus = "Employee ID cannot be blank.";
      } else if (
        !arrEntitlementData[index].LeaveYear &&
        typeof arrEntitlementData[index].LeaveYear !== "number"
      ) {
        entRow.ValidateStatus = "Leave Year cannot be blank.";
      } else if (typeof arrEntitlementData[index].LeaveType !== "string") {
        entRow.ValidateStatus = "Leave Type cannot be blank.";
      } else if (
        !arrEntitlementData[index].CarriedForward &&
        typeof arrEntitlementData[index].CarriedForward !== "number"
      ) {
        entRow.ValidateStatus = "Carried Forward cannot be blank.";
      } else if (
        !arrEntitlementData[index].Entitlement &&
        typeof arrEntitlementData[index].Entitlement !== "number"
      ) {
        entRow.ValidateStatus = "Entitlement cannot be blank.";
      } else if (
        !arrEntitlementData[index].AvailableLeave &&
        typeof arrEntitlementData[index].AvailableLeave !== "number"
      ) {
        entRow.ValidateStatus = "Available Leave cannot be blank.";
      } else if (
        !arrEntitlementData[index].TakenLeave &&
        typeof arrEntitlementData[index].TakenLeave !== "number"
      ) {
        entRow.ValidateStatus = "Taken Leave cannot be blank.";
      } else if (
        !arrEntitlementData[index].BalanceLeave &&
        typeof arrEntitlementData[index].BalanceLeave !== "number"
      ) {
        entRow.ValidateStatus = "Balance Leave cannot be blank.";
      }
    });

    let arrErrEntitlementData = arrEntitlementData.filter(
      entRow => entRow.ValidateStatus !== "Passed!"
    );

    if (arrEntitlementData.length === 0) {
      this.setState({
        entitlementData: arrEntitlementData,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "No rows have been uploaded! Please verify that you are using the correct template and that it contains Leave Entitlements data...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (arrErrEntitlementData.length > 0) {
      this.setState({
        entitlementData: arrErrEntitlementData,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "Invalid row(s) has/have been detected from the uploaded Leave Entitlements data! Please find those invalid row(s) in the table and fix them in Excel Template, then re-try uploading...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (
      arrErrEntitlementData.length === 0 &&
      arrEntitlementData.length > 0
    ) {
      this.setState({
        entitlementData: arrEntitlementData,
        isValid: true,
        loading: false
      });
      confirmAlert({
        message:
          "All uploaded Leave Entitlements data have successfully passed the validation process...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    }
  };

  confirmEntitlementSave = e => {
    confirmAlert({
      message: "Do you really want to save all uploaded Leave Entitlements?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleEntitlementSave(e)
        },
        {
          label: "No"
        }
      ]
    });
  };

  handleEntitlementSave = e => {
    // This is a temporary solution for saving Array of data, an API
    // for saving bulk of data should be created to speed up the saving
    this.state.entitlementData.map(entRow => {
      const jsonRowValues = {
        id: {
          emplid: entRow.EmployeeID,
          year: entRow.LeaveYear,
          leaveCode: entRow.LeaveType
        },
        employeeDetails: {
          emplId: entRow.EmployeeID
        },
        leaveCategory: {
          leaveCode: entRow.LeaveType
        },
        carryForward: entRow.CarriedForward,
        entitlement: entRow.Entitlement,
        availableLeave: entRow.AvailableLeave,
        takenLeave: entRow.TakenLeave,
        balanceLeave: entRow.BalanceLeave
      };

      const postRequest = Object.assign({}, jsonRowValues);
      fetchData({
        url: API_BASE_URL + "/leaveentitlement",
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
          //         onClick: () => this.props.history.push("/leaveentitlement")
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
    // this.props.history.push("/leaveentitlement");
    this.handleReset();
  };

  completedEntitlementSave = e => {
    confirmAlert({
      message:
        "All new Leave Entitlements have been successfully saved to the Database!",
      buttons: [
        {
          label: "OK",
          onClick: () => this.props.history.push("/leaveentitlement")
        }
      ]
    });
  };

  validateStateHasData = () => {
    const isInvalid = !this.state.entitlementData.length || !this.state.isValid;
    return isInvalid;
  };

  handleReset = () => {
    this.setState({
      entitlementData: [],
      filename: "",
      isValid: false,
      loading: false
    });
  };

  handleCancelUpload = () => {
    this.props.history.push("/leaveentitlement");
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

    const leaveEntitlementCols = [
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
        id: "emplId",
        Header: "Employee ID",
        accessor: "EmployeeID",
        minWidth: 90,
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
        minWidth: 130,
        sortable: true,
        filterable: true
      },
      {
        id: "year",
        Header: "Leave Year",
        accessor: "LeaveYear",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "LeaveType",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "carryForward",
        Header: "Carried Forward",
        accessor: "CarriedForward",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: "Entitlement",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "availableLeave",
        Header: "Available Leave",
        accessor: "AvailableLeave",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "takenLeave",
        Header: "Taken Leave",
        accessor: "TakenLeave",
        minWidth: 70,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "balanceLeave",
        Header: "Balance Leave",
        accessor: "BalanceLeave",
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
            <h3 className="headerStyle">Upload Leave Entitlements</h3>
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
                      Leave Entitlement Upload Template
                    </a>{" "}
                    for you to fill in the data.
                  </FormText>
                </Col>
                <Col sm={4} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => this.confirmEntitlementSave(event)}
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
                </Col>
              </FormGroup>
            </div>
            <ReactTable
              data={this.state.entitlementData}
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
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadEntitlement);
