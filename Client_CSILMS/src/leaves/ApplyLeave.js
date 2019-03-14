import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Alert
} from "reactstrap";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import "../common/Styles.css";
import MessageBox from "../modal/MessageBox";

class ApplyLeave extends Component {
  constructor(props) {
    super(props);

    let initialDate = new Date();
    initialDate.setUTCHours(0, 0, 0, 0);

    this.state = {
      userData: {
        emplId: "",
        name: "",
        reportsTo: null
      },
      staffLeave: {
        availableLeave: ""
      },
      leaveCategoryList: [
        {
          leaveCode: "",
          leaveDescr: ""
        }
      ],
      approverList: [
        {
          emplId: "",
          name: ""
        }
      ],
      startDate: initialDate,
      endDate: initialDate,
      isHalfDay: false,
      leaveDuration: 1,
      leaveCategory: "",
      leaveReason: "",
      attachedFile: null,
      approverId: "",
      attachedFileName: "",
      modalShow: false,
      msgHeaderText: "",
      msgBodyText: "",
      msgButton: ""
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doNotSubmit = this.doNotSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  // toggleSave = () => {
  //   this.setState(prevState => ({
  //     modalSave: !prevState.modalSave
  //   }));
  // };

  // toggleCancel = () => {
  //   this.setState(prevState => ({
  //     modalCancel: !prevState.modalCancel
  //   }));
  // };

  // handleCancel = () => {
  //   this.props.history.push("/");
  // };

  // clickdiscard = () => {
  //   confirmAlert({
  //     customUI: (event) => {
  //       return (
  //         <div className="confirmAlertBox">
  //           <h4>Are you sure?</h4>
  //           <p>You want to cancel this request?</p>
  //           <Button
  //             color="primary"
  //             size="sm"
  //             onClick={() => {
  //               this.props.history.push("/");
  //             }}
  //           >
  //             Yes
  //           </Button>
  //           <span> </span>
  //           <Button size="sm" onClick={() => this.}>No</Button>
  //         </div>
  //       );
  //     }
  //   });
  // };

  showModal = (msgHeaderText, msgBodyText, msgButton) => {
    this.setState({
      ...this.state,
      modalShow: !this.state.modalShow,
      msgHeaderText: msgHeaderText,
      msgBodyText: msgBodyText,
      msgButton: msgButton
    });
  };

  clickdiscard = () => {
    confirmAlert({
      title: "Confirmation",
      message: "Do you want to cancel this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.history.push("/")
        },
        {
          label: "No"
        }
      ]
    });
  };

  componentDidMount() {
    // fetch CSI Staff ID and Name from API
    fetchData({
      url: API_BASE_URL + "/employeedetail/me",
      method: "GET"
    })
      .then(data => {
        this.setState({ userData: data });
        if (data["reportsTo"] != null)
          this.setState({ approverId: data["reportsTo"]["emplId"] });
      })
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let userData = {
          emplId: "",
          name: "",
          reportsTo: null
        };
        this.setState({ userData: userData });
      });

    // fetch leave category from API
    fetchData({
      url: API_BASE_URL + "/leavecategories",
      method: "GET"
    })
      .then(data =>
        this.setState({
          leaveCategoryList: data,
          leaveCategory: data[0]["leaveCode"]
        })
      )
      .catch(err => {
        console.log(err);
        // if unable to fetch data, assign default (spaces) to values
        let leaveCategoryData = [
          {
            leaveCode: "",
            leaveDescr: ""
          }
        ];
        this.setState({ leaveCategoryList: leaveCategoryData });
      });

    // fetch leave balance from API
    const thisYear = new Date().getFullYear();
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me/" + thisYear + "/AL",
      method: "GET"
    })
      .then(data => this.setState({ staffLeave: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let staffLeaveData = {
          availableLeave: ""
        };
        this.setState({ staffLeave: staffLeaveData });
      });

    // fetch approvers from API
    fetchData({
      url: API_BASE_URL + "/leaveapprovers",
      method: "GET"
    })
      .then(data => this.setState({ approverList: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let approverListData = [
          {
            emplId: "",
            name: ""
          }
        ];
        this.setState({ approverList: approverListData });
      });
  }

  // this method process changes on all 3 date related fields
  handleDateChange(event) {
    const fieldName = event.target.name;
    const startDateStr = this.state.startDate.toISOString().substr(0, 10);
    const endDateStr = this.state.endDate.toISOString().substr(0, 10);

    switch (fieldName) {
      case "startDate":
        const checkDate1 = moment(new Date(event.target.value));
        if (checkDate1.isValid() === false) return; // do nothing if date is not valid

        let newStartDate = new Date(event.target.value);
        let newStartDateStr = newStartDate.toISOString().substr(0, 10);

        // only process if date actually changed
        if (newStartDateStr !== startDateStr) {
          // if new end date and start date are same date
          if (newStartDateStr === endDateStr) {
            this.setState({
              startDate: newStartDate
            });
          } else if (newStartDateStr < endDateStr) {
            this.setState({
              startDate: newStartDate,
              isHalfDay: false
            });
          } else {
            this.setState({
              startDate: newStartDate,
              endDate: newStartDate,
              isHalfDay: false
            });
          }
        }
        break;

      case "endDate":
        const checkDate2 = moment(new Date(event.target.value));
        if (checkDate2.isValid() === false) return; // do nothing if date is not valid

        let newEndDate = new Date(event.target.value);
        let newEndDateStr = newEndDate.toISOString().substr(0, 10);

        // only process if date actually changed
        if (newEndDateStr !== endDateStr) {
          // if new end date and start date are same date
          if (newEndDateStr === startDateStr) {
            this.setState({
              endDate: newEndDate
            });
          } else if (newEndDateStr > startDateStr) {
            this.setState({
              endDate: newEndDate,
              isHalfDay: false
            });
          } else {
            // If End Date is smaller than Start Date, reset Start Date to End Date
            this.setState({
              startDate: newEndDate,
              endDate: newEndDate,
              isHalfDay: false
            });
          }
        }
        break;

      case "isHalfDay":
        if (startDateStr === endDateStr) {
          let newIsHalfDay = !this.state.isHalfDay;
          this.setState({
            isHalfDay: newIsHalfDay,
            leaveDuration: newIsHalfDay ? 0.5 : 1
          });
        }
        break;

      case "leaveDuration":
        this.setState({ leaveDuration: event.target.value });
        break;

      default:
        break;
    }
  }

  // this method process changes on non-date related fields
  handleDetailsChange(event) {
    switch (event.target.name) {
      case "leaveCategory":
        this.setState({ leaveCategory: event.target.value });
        break;
      case "leaveReason":
        this.setState({ leaveReason: event.target.value });
        break;
      case "attachment":
        if (event.target.files[0].size > 5242880) {
          confirmAlert({
            message:
              "Unable to upload file. This file exceeded the limit of 5MB",
            buttons: [
              {
                label: "Ok"
              }
            ]
          });
          event.target.value = null;
        } else this.setState({ attachedFile: event.target.files[0] });
        break;
      case "approverId":
        this.setState({ approverId: event.target.value });
        break;
      default:
        break;
    }
  }

  // Do not submit form, unless user clicked on submit button
  doNotSubmit(event) {
    event.preventDefault();
  }

  // create JSON object with form data, and call API
  async handleSubmit(event) {
    event.preventDefault();
    let validForm = true;

    // validate form data
    let durationError = this.validateLeaveDuration(this.state.leaveDuration);
    if (durationError !== "") validForm = false;

    if (validForm) {
      // upload file to server
      if (this.state.attachedFile != null) {
        await this.uploadFile(this.state.attachedFile);

        if (this.state.attachedFileName === "") return false; // if attached file name is still blank = error in upload file
      }
      // create JSON Object for new Leave Request
      let newLeaveRequest = {
        id: {
          emplid: this.state.userData["emplId"],
          effDate: new Date(),
          startDate: this.state.startDate,
          leaveCode: this.state.leaveCategory
        },
        employeeDetails: {
          emplId: this.state.userData["emplId"]
        },
        leaveCategory: {
          leaveCode: this.state.leaveCategory
        },
        endDate: this.state.endDate,
        halfDay: this.state.isHalfDay ? "Y" : "N",
        leaveDuration: this.state.leaveDuration,
        leaveStatus: "PNAPV",
        approver: this.state.approverId,
        reason: this.state.leaveReason,
        approverDate: null,
        attachment: this.state.attachedFileName
      };

      console.log(JSON.stringify(newLeaveRequest));

      fetchData({
        url: API_BASE_URL + "/appliedleave",
        method: "POST",
        body: JSON.stringify(newLeaveRequest)
      })
        .then(res => {
          //if (res.hasOwnProperty("id") && res["id"] != null)
          confirmAlert({
            message: "Your leave request is submitted.",
            buttons: [
              {
                label: "Ok",
                onClick: () => this.props.history.push("/myleavehistory")
              }
            ]
          });
        })
        .catch(err => {
          // delete the previously uploaded file
          fetchData({
            url:
              API_BASE_URL +
              "/attachment/deletefile/" +
              this.state.attachedFileName,
            method: "DELETE"
          }).catch(err => {});

          confirmAlert({
            message: err.message,
            buttons: [
              {
                label: "Ok"
              }
            ]
          });
        });
    }
  }

  async uploadFile(attachedFile) {
    let data = new FormData();
    data.append("file", attachedFile);

    await fetchData({
      url: API_BASE_URL + "/attachment/uploadfile",
      method: "POST",
      custom_no_headers: "no_header",
      body: data
    })
      .then(res => {
        this.setState({ attachedFileName: res.file });
      })
      .catch(err => {
        console.log(err);
        this.setState({ attachedFIleName: "" });
        confirmAlert({
          message:
            "Unable to upload file. Please ensure file does not exceed 5MB.",
          buttons: [
            {
              label: "Ok"
            }
          ]
        });
      });
  }

  validateLeaveDuration(newLeaveDuration) {
    // Validate if input is a number
    if (isNaN(newLeaveDuration)) {
      return <Alert color="danger">Invalid number</Alert>;
    }

    // Validate if input exceedes maximum duration
    const milliseconds = 86400000;
    const dayDiff =
      Math.ceil((this.state.endDate - this.state.startDate) / milliseconds) + 1;

    if (newLeaveDuration > dayDiff) {
      return (
        <Alert color="danger">
          Duration exceeds maximum duration between Start Date and End Date
        </Alert>
      );
    }

    // Validate if input is integer, if start date and end date are different
    const startDateStr = this.state.startDate.toISOString().substr(0, 10);
    const endDateStr = this.state.endDate.toISOString().substr(0, 10);

    if (
      startDateStr !== endDateStr &&
      !Number.isInteger(Number(newLeaveDuration))
    ) {
      return (
        <Alert color="danger">Please apply half day leave separately</Alert>
      );
    }

    // If pass all validation, return empty string
    return "";
  }

  render() {
    console.log("STATE", this.state);
    const {
      userData,
      staffLeave,
      leaveCategoryList,
      approverList,
      startDate,
      endDate,
      isHalfDay,
      leaveDuration,
      leaveCategory,
      // leaveReason,
      // attachedFile,
      approverId
    } = this.state;

    let durationErrorMsg = this.validateLeaveDuration(leaveDuration);

    return (
      <div className="mainContainerFlex ">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Apply Leave</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <h5>Annual Leave Balance: {staffLeave["balanceLeave"]} Days</h5>
        </div>
        <div className="tableContainerFlex">
          <Form onSubmit={this.doNotSubmit}>
            <FormGroup row>
              <Label for="csiStaffId" sm={2}>
                Employee ID:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="csiStaffId"
                  id="csiStaffId"
                  value={userData["emplId"]}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="staffName" sm={2}>
                Employee Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="staffName"
                  id="staffName"
                  value={userData["name"]}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveCategory" sm={2}>
                Leave Category:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="leaveCategory"
                  id="leaveCategory"
                  onChange={this.handleDetailsChange}
                  value={leaveCategory}
                >
                  {leaveCategoryList.map(leaveCategory => {
                    return (
                      <option
                        key={leaveCategory["leaveCode"]}
                        value={leaveCategory["leaveCode"]}
                      >
                        {leaveCategory["leaveDescr"]}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="startDate" sm={2}>
                Start Date:
              </Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate.toISOString().substr(0, 10)}
                  onChange={this.handleDateChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="endDate" sm={2}>
                End Date:
              </Label>
              <Col sm={10}>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate.toISOString().substr(0, 10)}
                  onChange={this.handleDateChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label check sm={2} />
              <Col sm={10}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input
                  type="checkbox"
                  name="isHalfDay"
                  id="isHalfDay"
                  disabled={
                    startDate.toISOString().substr(0, 10) ===
                    endDate.toISOString().substr(0, 10)
                      ? false
                      : true
                  }
                  onChange={this.handleDateChange}
                  checked={isHalfDay}
                />{" "}
                Check the box if you are taking half day leave.
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="leaveDuration">
                Leave Duration:{" "}
              </Label>
              <Col sm={2}>
                <Input
                  type="text"
                  name="leaveDuration"
                  id="leaveDuration"
                  value={leaveDuration}
                  placeholder="Days"
                  onChange={this.handleDateChange}
                  required
                />
              </Col>
              <Col sm={8}>{durationErrorMsg}</Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveReason" sm={2}>
                Leave Reason:
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="leaveReason"
                  id="leaveReason"
                  onChange={this.handleDetailsChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="attachment" sm={2}>
                File:
              </Label>
              <Col sm={10}>
                <Input
                  type="file"
                  name="attachment"
                  id="attachment"
                  onChange={this.handleDetailsChange}
                />
                <FormText color="muted">
                  Please attach your document (maximum file size is 5 MB).
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="approverId" sm={2}>
                Approver:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="approverId"
                  id="approverId"
                  onChange={this.handleDetailsChange}
                  value={approverId}
                >
                  {approverList.map(approver => {
                    if (approver["emplId"] !== userData["emplId"]) {
                      return (
                        <option
                          key={approver["emplId"]}
                          value={approver["emplId"]}
                        >
                          {approver["name"]}
                        </option>
                      );
                    }
                    return true;
                  })}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button
                  color="primary"
                  style={{ backgroundColor: "#3F51B5", color: "white" }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
                <span> </span>
                {/* <Button onClick={this.clickdiscard}>Cancel</Button> */}
                <Button
                  onClick={() =>
                    this.showModal("Cancel Confirm", "Are you sure?", "YesNo")
                  }
                >
                  Cancel
                </Button>
              </Col>
            </FormGroup>
            <MessageBox
              onWindowClose={() => this.showModal()}
              onExecute={() => this.props.history.push("/")}
              show={this.state.modalShow}
              {...this.state}
            >
              Search New Employee
            </MessageBox>
          </Form>
        </div>
      </div>
    );
  }
}

export default ApplyLeave;
