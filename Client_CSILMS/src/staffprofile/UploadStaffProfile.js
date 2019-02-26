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
import { Redirect, withRouter, Link } from "react-router-dom";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import XLSX from "xlsx";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExcelUploadTemplate from "../templates/Leaveprofile.xlsx";

class UploadStaffProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
      filename: "",
      loading: false
    };
    this.handleExcelFileUpload = this.handleExcelFileUpload.bind(this);
    this.handleProfileSave = this.handleProfileSave.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.validateUploadedRowsData = this.validateUploadedRowsData.bind(this);
    this.completedProfileSave = this.completedProfileSave.bind(this);
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleExcelFileUpload(file) {
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
        /* Parse Profile Data */
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get the second worksheet */
        const worksheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[worksheetName];
        /* Convert array of arrays to JSON */
        const uploadData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /* Update State's Profile Data */
        this.setState({
          ProfileData: uploadData,
          loading: true
        });
        this.validateUploadedRowsData();
      };
      if (rABS) reader.readAsBinaryString(file.target.files[0]);
      else reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      this.setState({
        profileData: [],
        filename: "",
        loading: false
      });
    }
  }

  validateUploadedRowsData() {
    // var leaveTypes = [
    //   "AL",
    //   "CL",
    //   "EL",
    //   "HL",
    //   "MR",
    //   "MT",
    //   "PL",
    //   "PT",
    //   "RL",
    //   "SL"
    // ];
    // let updatedProfileData = this.state.profileData.filter(
    //   entRow =>
    //     entRow.EmployeeID &&
    //     entRow.LeaveYear &&
    //     entRow.LeaveType &&
    //     leaveTypes.indexOf(entRow.LeaveType) > -1
    // );
    // updatedProfileData.map(entRow => {
    //   if (!entRow.CarriedForward) entRow.CarriedForward = 0;
    //   if (!entRow.Profile) entRow.Profile = 0;
    //   if (!entRow.AvailableLeave) entRow.AvailableLeave = 0;
    //   if (!entRow.TakenLeave) entRow.TakenLeave = 0;
    //   if (!entRow.BalanceLeave) entRow.BalanceLeave = 0;
    // });
    // this.setState({
    //   profileData: updatedprofileData,
    //   loading: false
    // });
  }

  confirmProfileSave(e) {
    confirmAlert({
      message: "Do you really want to save all uploaded Profiles?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleProfileSave(e)
        },
        {
          label: "No"
        }
      ]
    });
  }

  handleProfileSave(e) {
    // This is a temporary solution for saving Array of data, an API
    // for saving bulk of data should be created to speed up the saving
    this.state.profileData.map(entRow => {
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
        profile: entRow.Profile,
        availableLeave: entRow.AvailableLeave,
        takenLeave: entRow.TakenLeave,
        balanceLeave: entRow.BalanceLeave
      };

      const postRequest = Object.assign({}, jsonRowValues);
      fetchData({
        url: API_BASE_URL + "/employeeprofile",
        method: "POST",
        body: JSON.stringify(postRequest)
      })
        .then(response => {
          if (response.ok) {
            //   confirmAlert({
            //     message: "Profile has been successfully inserted!",
            //     buttons: [
            //       {
            //         label: "OK",
            //         onClick: () => this.props.history.push("/employeeprofile")
            //       }
            //     ]
            //   });
          }
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
    this.props.history.push("/employeeprofile");
  }

  completedProfileSave = e => {
    confirmAlert({
      message:
        "All Employee Profiles have been successfully saved to the Database!",
      buttons: [
        {
          label: "OK",
          onClick: () => this.props.history.push("/employeeprofile")
        }
      ]
    });
  };

  validateStateHasData = () => {
    const isInvalid = !this.state.profileData.length;
    return isInvalid;
  };

  handleReset = () => {
    this.setState({ profileData: [], filename: "", loading: false });
  };

  handleCancelUpload = () => {
    this.props.history.push("/staffprofile");
  };

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    const employeeProfileCols = [
      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "EmployeeID",
        width: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "year",
        Header: "Leave Year",
        accessor: "LeaveYear",
        // minWidth: 120,
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
        // minWidth: 180,
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
        minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "profile",
        Header: "profile",
        accessor: "profile",
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
        accessor: "AvailableLeave",
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
        accessor: "TakenLeave",
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
        accessor: "BalanceLeave",
        // minWidth: 120,
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
            <h3 className="headerStyle">Upload Employee Profile</h3>
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
                  >
                    Hello
                  </Input>
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
                    onClick={event => this.confirmProfileSave(event)}
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
              data={this.state.ProfileData}
              columns={employeeProfileCols}
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
          </Form>
        </div>
      </div>
    );
  }
}

// UploadProfile.propTypes = {
//   CarriedForward: PropTypes.number,
//   Profile: PropTypes.number,
//   AvailableLeave: PropTypes.number,
//   TakenLeave: PropTypes.number,
//   BalanceLeave: PropTypes.number
// };

export default withRouter(UploadStaffProfiles);
