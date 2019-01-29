import React, { Component } from "react";
import { Form, FormGroup, Label, Input, FormText, Col, Alert } from "reactstrap";
import Button from '@material-ui/core/Button';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class ApplyLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        id: "",
        csiStaffId: "",
        staffName: "",
        lineManager: null
      },
      staffLeave: {
        availableLeave: ""
      },
      leaveCategoryList: [
        {
          id: "",
          leaveCode: "",
          leaveName: ""
        }
      ],
      approverList: [
        {
          id: "",
          staffName: ""
        }
      ],
      startDate: new Date(),
      endDate: new Date(),
      isHalfDay: false,
      leaveDuration: 1,
      leaveCategory: "",
      leaveReason: "",
      attachedFile: null,
      approverId: ""
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doNotSubmit = this.doNotSubmit.bind(this);
  }

  clickdiscard = () => {
    confirmAlert({
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
    fetch("http://localhost/api/staffprofile/1")
      .then(response => response.json())
      .then(data => {
        this.setState({ userData: data });
        if (data["lineManager"] !== null)
          this.setState({ approverId: data["lineManager"]["id"] });
      })
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let userData = {
          id: "",
          csiStaffId: "",
          staffName: "",
          lineManager: null
        };
        this.setState({ userData: userData });
      });

    // fetch leave category from API
    fetch("http://localhost/api/leavecategories")
      .then(response => response.json())
      .then(data =>
        this.setState({ leaveCategoryList: data, leaveCategory: data[0]["id"] })
      )
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let leaveCategoryData = [
          {
            id: "",
            leaveCode: "",
            leaveName: ""
          }
        ];
        this.setState({ leaveCategoryList: leaveCategoryData });
      });

    // fetch leave balance from API
    fetch("http://localhost/api/staffleave/1")
      .then(response => response.json())
      .then(data => this.setState({ staffLeave: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let staffLeaveData = {
          availableLeave: ""
        };
        this.setState({ staffLeave: staffLeaveData });
      });

    // fetch approvers from API
    fetch("http://localhost/api/managers")
      .then(response => response.json())
      .then(data => this.setState({ approverList: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let approverListData = [
          {
            id: "",
            staffName: ""
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
        this.setState({ attachedFile: event.target.files[0] });
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
  handleSubmit(event) {
    event.preventDefault();
    let validForm = true;

    // validate form data
    let durationError = this.validateLeaveDuration(this.state.leaveDuration);
    if (durationError !== "") validForm = false;

    if (validForm) {
      // create JSON Object for new Leave Request
      let newLeaveRequest = {
        staffId: { id: this.state.userData["id"] },
        leaveCategory: { id: this.state.leaveCategory },
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        leaveDuration: this.state.leaveDuration,
        leaveReason: this.state.leaveReason,
        leaveStatusId: { id: 3 } // All new leave has status of 3, Pending Approval
      };

      console.log(JSON.stringify(newLeaveRequest));

      fetch("http://localhost/api/leavedetail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newLeaveRequest)
      })
        .then(res => res.json())
        .then(res => {
          console.log(JSON.stringify(res));
          if (res.hasOwnProperty("id") && res["id"] != null)
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
        //        .then(this.props.history.push('/MyLeaveHistory'))
        .catch(err => {
          console.log("!!! Error : ".err);
        });
    }
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
      leaveReason,
      attachedFile,
      approverId
    } = this.state;

    let durationErrorMsg = this.validateLeaveDuration(leaveDuration);

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Apply Leave</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <h5>Annual Leave Balance: {staffLeave["availableLeave"]} Days</h5>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Form onSubmit={this.doNotSubmit}>
            <FormGroup>
              <Label for="csiStaffId">CSI Staff ID</Label>
              <Input
                type="text"
                name="csiStaffId"
                id="csiStaffId"
                value={userData["csiStaffId"]}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="staffName">Staff Name</Label>
              <Input
                type="text"
                name="staffName"
                id="staffName"
                value={userData["staffName"]}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="leaveCategory">Leave Category</Label>
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
                      value={leaveCategory["id"]}
                    >
                      {leaveCategory["leaveName"]}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate.toISOString().substr(0, 10)}
                onChange={this.handleDateChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate.toISOString().substr(0, 10)}
                onChange={this.handleDateChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
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
              </Label>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label xs={2} for="leaveDuration">
                Leave Duration:{" "}
              </Label>
              <Col xs={2}>
                <Input
                  type="text"
                  name="leaveDuration"
                  id="leaveDuration"
                  value={leaveDuration}
                  placeholder="Days"
                  onChange={this.handleDateChange}
                />
              </Col>
              <Col xs={8}>{durationErrorMsg}</Col>
            </FormGroup>
            <FormGroup>
              <Label for="leaveReason">Leave Reason</Label>
              <Input
                type="textarea"
                name="leaveReason"
                id="leaveReason"
                onChange={this.handleDetailsChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="attachment">File</Label>
              <Input
                type="file"
                name="attachment"
                id="attachment"
                onChange={this.handleDetailsChange}
              />
              <FormText color="muted">Please attach your document.</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="approverId">Approver</Label>
              <Input
                type="select"
                name="approverId"
                id="approverId"
                onChange={this.handleDetailsChange}
                value={approverId}
              >
                {approverList.map(approver => {
                  return (
                    <option key={approver["id"]} value={approver["id"]}>
                      {approver["staffName"]}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <br />
            <Button variant="contained" color="primary" onClick={this.handleSubmit} style={{ textTransform: 'none' }}>
              Submit
            </Button>
            <span> </span>
            <Button variant="contained" onClick={this.clickdiscard} style={{ textTransform: 'none' }}>
              Discard
            </Button>
          </Form>
        </div>
        <br />
      </div>
    );
  }
}

export default ApplyLeave;
