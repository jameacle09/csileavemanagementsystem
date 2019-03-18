import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col
} from "reactstrap";
import { fetchData, getWeekDay, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../common/Styles.css";

class ApplyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplId: "",
      name: "",
      leaveCategory: "AL",
      startDate: formatDateYMD(new Date()),
      endDate: "",
      isHalfDay: false,
      leaveDuration: 0,
      leaveReason: "",
      attachedFile: null,
      attachedFileName: "",
      approverId: "",
      year: new Date().getFullYear(),
      annualLeave: 0,
      balanceLeave: 0,
      leaveEntitlementsLookup: [],
      approversLookup: [],
      publicHolidaysLookup: []
    };
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    this.loadCurrentUserData();
    this.loadCurrentUserALEntitlement();
    this.loadLeaveApproversLookup();
    this.loadPublicHolidaysLookup();
  }

  loadCurrentUserData = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetail/me",
      method: "GET"
    })
      .then(data => {
        this.setState(
          {
            emplId: data.emplId,
            name: data.name,
            approverId: data.reportsTo.emplId
          },
          () => this.loadCurrentUserEntitlements()
        );
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  loadCurrentUserEntitlements = () => {
    var currDate = new Date();
    fetchData({
      url:
        API_BASE_URL +
        "/leaveentitlement/" +
        this.state.emplId +
        "/" +
        currDate.getFullYear(),
      method: "GET"
    })
      .then(data =>
        this.setState({
          leaveEntitlementsLookup: data,
          year: currDate.getFullYear()
        })
      )
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  loadCurrentUserALEntitlement = () => {
    const thisYear = new Date().getFullYear();
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me/" + thisYear + "/AL",
      method: "GET"
    })
      .then(data =>
        this.setState({
          annualLeave: data.balanceLeave,
          balanceLeave: data.balanceLeave
        })
      )
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  loadLeaveApproversLookup = () => {
    fetchData({
      url: API_BASE_URL + "/leaveapprovers",
      method: "GET"
    })
      .then(data => this.setState({ approversLookup: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  loadPublicHolidaysLookup = () => {
    fetchData({
      url: API_BASE_URL + "/publicholidays",
      method: "GET"
    })
      .then(data =>
        this.setState({
          publicHolidaysLookup: data
        })
      )
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    // Upload file to server
    if (this.state.attachedFile !== null) {
      // await this.uploadFile(this.state.attachedFile);
      this.uploadFile(this.state.attachedFile);
      if (this.state.attachedFileName === "") return false;
    }

    const jsonRowValues = {
      id: {
        emplid: this.state.emplId,
        effDate: formatDateYMD(new Date()),
        startDate: this.state.startDate,
        leaveCode: this.state.leaveCategory
      },
      employeeDetails: {
        emplId: this.state.emplId
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
    const newLeaveRequest = Object.assign({}, jsonRowValues);

    fetchData({
      url: API_BASE_URL + "/appliedleave",
      method: "POST",
      body: JSON.stringify(newLeaveRequest)
    })
      .then(res => {
        confirmAlert({
          message: "Your leave request has been submitted.",
          buttons: [
            {
              label: "OK",
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
              label: "OK"
            }
          ]
        });
      });
  };

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
              label: "OK"
            }
          ]
        });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case "leaveCategory":
        let arrleaveEntitlementsLookup = this.state.leaveEntitlementsLookup;
        let leaveEnt = arrleaveEntitlementsLookup.find(
          entitlement => entitlement.id.leaveCode === value
        );
        this.setState(
          {
            [name]: value,
            balanceLeave: leaveEnt.balanceLeave
          },
          () => this.computeLeaveDuration()
        );
        break;
      case "isHalfDay":
        this.setState({ isHalfDay: !this.state.isHalfDay }, () =>
          this.computeLeaveDuration()
        );
        break;
      case "attachment":
        if (event.target.files[0].size > 5242880) {
          confirmAlert({
            message:
              "Unable to upload file. This file exceeded the limit of 5MB",
            buttons: [
              {
                label: "OK"
              }
            ]
          });
          event.target.value = null;
        } else this.setState({ attachedFile: event.target.files[0] });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  };

  validateDateFields = event => {
    const { name, value } = event.target;
    let varDate = "";

    if (name === "startDate") {
      if (isNaN(Date.parse(value))) {
        confirmAlert({
          message: "Invalid Start Date value.",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
        return;
      }
      varDate = new Date(value);
      if (varDate.getFullYear() !== this.state.year) {
        confirmAlert({
          message:
            "Start Date must be within Calendar Year of " +
            this.state.year +
            ".",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
        return;
      }
      if (!isNaN(Date.parse(this.state.endDate))) {
        if (value > this.state.endDate) {
          confirmAlert({
            message: "Start Date must not be higher than End Date.",
            buttons: [
              {
                label: "OK"
              }
            ]
          });
          return;
        }
        if (value < this.state.endDate) {
          this.setState({ isHalfDay: false }, () =>
            this.computeLeaveDuration()
          );
        } else {
          this.computeLeaveDuration();
        }
      }
    }
    if (name === "endDate") {
      if (isNaN(Date.parse(value))) {
        confirmAlert({
          message: "Invalid End Date value.",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
        return;
      }
      varDate = new Date(value);
      if (varDate.getFullYear() !== this.state.year) {
        confirmAlert({
          message:
            "End Date must be within Calendar Year of " + this.state.year + ".",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
        return;
      }
      if (!isNaN(Date.parse(this.state.startDate))) {
        if (this.state.startDate > value) {
          confirmAlert({
            message: "End Date must not be lower than Start Date.",
            buttons: [
              {
                label: "OK"
              }
            ]
          });
          return;
        }
        if (this.state.startDate < value) {
          this.setState({ isHalfDay: false }, () =>
            this.computeLeaveDuration()
          );
        } else {
          this.computeLeaveDuration();
        }
      }
    }
  };

  computeLeaveDuration = () => {
    const { startDate, endDate, isHalfDay, balanceLeave } = this.state;
    let arrPublicHolidaysLookup = this.state.publicHolidaysLookup;
    let arrDateOfLeaves = [],
      currLeaveDate = "",
      nextLeaveDate = "",
      durationleave = 0;
    var x = 366;
    currLeaveDate = new Date(startDate);
    nextLeaveDate = formatDateYMD(
      currLeaveDate.setDate(currLeaveDate.getDate())
    );

    for (let i = 0; i < x; i++) {
      if (nextLeaveDate <= endDate) {
        if (
          getWeekDay(nextLeaveDate) !== "Sunday" &&
          getWeekDay(nextLeaveDate) !== "Saturday"
        )
          arrDateOfLeaves.push(nextLeaveDate);
        currLeaveDate = new Date(nextLeaveDate);
      } else {
        i = 367;
      }
      nextLeaveDate = formatDateYMD(
        currLeaveDate.setDate(currLeaveDate.getDate() + 1)
      );
    }

    arrPublicHolidaysLookup.forEach(holiday => {
      let filtered = arrDateOfLeaves.filter(function(value, index, arr) {
        return value !== formatDateYMD(holiday.holidayDate);
      });
      arrDateOfLeaves = filtered;
    });
    durationleave = arrDateOfLeaves.length;
    if (durationleave === 1 && isHalfDay) {
      this.setState({
        leaveDuration: 0.5
      });
    } else {
      this.setState({
        leaveDuration: durationleave
      });
    }
    if (durationleave === 0) {
      confirmAlert({
        message: "Leave Duration should not be zero.",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else {
      if (balanceLeave < durationleave) {
        confirmAlert({
          message:
            "Leave Duration shouldn't be higher than your Leave Balance.",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    }
  };

  validateFields = () => {
    const {
      emplId,
      leaveCategory,
      year,
      balanceLeave,
      startDate,
      endDate,
      leaveDuration,
      leaveReason,
      approverId
    } = this.state;

    let varStartDate = new Date(startDate),
      varEndDate = new Date(endDate);

    const isInvalid =
      !emplId ||
      !leaveCategory ||
      !startDate ||
      varStartDate.getFullYear() !== year ||
      !endDate ||
      varEndDate.getFullYear() !== year ||
      leaveDuration === 0 ||
      leaveDuration > balanceLeave ||
      !leaveReason ||
      !approverId;
    return isInvalid;
  };

  handleCancel = () => {
    confirmAlert({
      message: "Cancel this leave application?",
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

  render() {
    const {
      // balanceLeave,
      emplId,
      name,
      leaveCategory,
      startDate,
      endDate,
      isHalfDay,
      leaveDuration,
      leaveEntitlementsLookup,
      approversLookup,
      // leaveReason,
      // attachedFile,
      approverId
    } = this.state;

    return (
      <div className="mainContainerFlex ">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Apply Leave</h3>
          </span>
        </div>
        {/* <div className="tableContainerFlex">
          <h5>Annual Leave Balance: {balanceLeave} Days</h5>
        </div> */}
        <div className="tableContainerFlex">
          <Form>
            <FormGroup row>
              <Label for="emplId" sm={2}>
                Employee ID:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="emplId"
                  id="emplId"
                  value={emplId}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={2}>
                Employee Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  disabled={true}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="leaveCategory" sm={2}>
                Leave Type:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="leaveCategory"
                  id="leaveCategory"
                  onChange={this.handleChange}
                  value={leaveCategory}
                >
                  {/* <option key="" value="">
                    --- Select Leave Type ---
                  </option> */}
                  {leaveEntitlementsLookup.map(leaveEnt => {
                    // if (leaveEnt.balanceLeave > 0) {
                    return (
                      <option
                        key={leaveEnt.leaveCategory.leaveCode}
                        value={leaveEnt.leaveCategory.leaveCode}
                      >
                        {leaveEnt.leaveCategory.leaveDescr} (
                        {leaveEnt.balanceLeave} days)
                      </option>
                    );
                    // }
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
                  value={formatDateYMD(startDate)}
                  onChange={this.handleChange}
                  onBlur={this.validateDateFields}
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
                  value={formatDateYMD(endDate)}
                  onChange={this.handleChange}
                  onBlur={this.validateDateFields}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label check sm={2} />
              <Col sm={10}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input
                  type="checkbox"
                  id="isHalfDay"
                  name="isHalfDay"
                  disabled={
                    formatDateYMD(startDate) === formatDateYMD(endDate)
                      ? false
                      : true
                  }
                  checked={isHalfDay}
                  onChange={this.handleChange}
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
                  disabled={true}
                />
              </Col>
              <Label sm={8} align="left">
                day(s)
              </Label>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
                <FormText color="muted">
                  Please attach your document (maximum file size is 5 MB).
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="approverId" sm={2}>
                Approver Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="approverId"
                  id="approverId"
                  onChange={this.handleChange}
                  value={approverId}
                >
                  {approversLookup.map(approver => {
                    if (approver.emplId !== emplId) {
                      return (
                        <option key={approver.emplId} value={approver.emplId}>
                          {approver.name} ({approver.emplId})
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
                  className="largeButtonOverride"
                  onClick={this.handleSubmit}
                  disabled={this.validateFields()}
                >
                  Submit
                </Button>
                <span> </span>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default ApplyLeave;
