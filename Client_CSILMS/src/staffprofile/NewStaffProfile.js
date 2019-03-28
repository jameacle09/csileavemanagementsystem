import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { confirmAlert } from "react-confirm-alert";
import { API_BASE_URL } from "../constants";
import "../common/Styles.css";
import LoadingPage from "../common/LoadingPage";

class NewStaffProfile extends Component {
  constructor(props) {
    super(props);

    let initialDate = new Date();
    initialDate.setUTCHours(0, 0, 0, 0);
    this.loadTranslateItem = this.loadTranslateItem.bind(this);
    this.isHrRole = this.isHrRole.bind(this);
    this.isManagerRole = this.isManagerRole.bind(this);
    this.getManagerDetails = this.getManagerDetails.bind(this);
    this.verifyEmplId = this.verifyEmplId.bind(this);
    this.verifyEmailExists = this.verifyEmailExists.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadManagerList = this.loadManagerList.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.state = {
      emplIdExists: false,
      roles: [{ role: "E", roleName: "EMPLOYEE" }],
      managerList: [{ emplId: "", name: "" }],
      emplId: "",
      name: "",
      businessEmail: "",
      effectiveDate: null,
      reportsTo: { emplId: "", name: "" },
      reportDottedLine: "",
      deptId: "",
      nricPassport: "",
      gender: "",
      marriageStatus: "",
      marriageDate: "",
      marriageCount: "",
      totalChildren: "",
      jobTitle: "",
      mobileNo: "",
      businessUnit: "",
      managerId: "",
      joinDate: initialDate,
      status: "A",
      translateItemList: [
        {
          id: { fieldname: "", fieldvalue: "" },
          effStatus: "",
          xlatlongname: "",
          xlatshortname: ""
        }
      ],
      loading: true
    };
  }

  isHrRole(roles) {
    if (!roles) return;
    const arrRoles = roles;
    const currRole = arrRoles.filter(function(role) {
      return role.roleName === "HR";
    });

    return currRole.length === 0 ? false : true;
  }

  isManagerRole(roles) {
    if (!roles) return;
    const arrRoles = roles;
    const currRole = arrRoles.filter(function(role) {
      return role.roleName === "MANAGER";
    });

    return currRole.length === 0 ? false : true;
  }

  verifyEmplId(event) {
    if (event.target.value === "") {
      return;
    }

    fetchData({
      url: API_BASE_URL + "/employeedetails/" + event.target.value,
      method: "GET"
    })
      .then(response => {
        const emplId = response.emplId;
        if (emplId !== null) {
          ReactDOM.findDOMNode(this.refs["csiStaffId"]).setCustomValidity(
            "Employee Id already exists!"
          );
        } else {
          ReactDOM.findDOMNode(this.refs["csiStaffId"]).setCustomValidity("");
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  verifyEmailExists(event) {
    if (event.target.value === "") {
      return;
    }

    fetchData({
      url: API_BASE_URL + "/verifyEmailExists/" + event.target.value,
      method: "GET"
    })
      .then(response => {
        const emplId = response.emplId;
        if (emplId !== null) {
          ReactDOM.findDOMNode(this.refs["email"]).setCustomValidity(
            "E-mail Id already exists!"
          );
        } else {
          ReactDOM.findDOMNode(this.refs["email"]).setCustomValidity("");
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  getManagerDetails(emplId) {
    if (!emplId) return;
    const currManager = this.state.managerList.filter(function(manager) {
      return manager.emplId === emplId;
    });

    return currManager[0];
  }

  loadProfile() {
    let initialDate = new Date();
    initialDate.setUTCHours(0, 0, 0, 0);
    const { emplId } = this.props.computedMatch.params;

    fetchData({
      url: API_BASE_URL + "/employeedetails/" + emplId,
      method: "GET"
    })
      .then(data => {
        this.setState({
          emplId: data.emplId,
          name: data.name,
          businessEmail: data.businessEmail,
          nricPassport: data.nricPassport,
          gender: data.gender,
          marriageStatus: data.marriageStatus,
          marriageDate:
            data.marriageDate === null
              ? initialDate
              : formatDateYMD(data.marriageDate),
          marriageCount: data.marriageCount,
          totalChildren: data.totalChildren,
          jobTitle: data.jobTitle,
          effectiveDate: data.effectiveDate,
          mobileNo: data.mobileNo,
          deptId: data.deptId,
          businessUnit: data.businessUnit,
          reportsTo: data.reportsTo,
          reportDottedLine: data.reportDottedLine,
          joinDate:
            data.joinDate === null ? initialDate : formatDateYMD(data.joinDate),
          status: data.status,
          roles: data.roles
        });

        if (this.isHrRole(this.state.roles)) {
          ReactDOM.findDOMNode(this.refs["HR"]).checked = true;
        }

        if (this.isManagerRole(this.state.roles)) {
          ReactDOM.findDOMNode(this.refs["MANAGER"]).checked = true;
        }

        ReactDOM.findDOMNode(this.refs["csiStaffId"]).disabled = true;
        if (data.marriageStatus === "SIN") {
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = true;
        } else {
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = false;
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  loadManagerList() {
    // fetch approvers from API
    fetchData({
      url: API_BASE_URL + "/leaveapprovers",
      method: "GET"
    })
      .then(data => this.setState({ managerList: data }))
      .catch(error => {
        // if unable to fetch data, assign default (spaces) to values
        let managerListData = [{ emplId: "", name: "" }];
        this.setState({ managerList: managerListData });

        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  loadTranslateItem() {
    // fetch translate item from API
    fetchData({
      url: API_BASE_URL + "/translateitems",
      method: "GET"
    })
      .then(data => {
        this.setState({ translateItemList: data });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  handleChange(event) {
    switch (event.target.name) {
      case "csiStaffId":
        this.setState({ emplId: event.target.value });
        break;
      case "staffName":
        this.setState({ name: event.target.value });
        break;
      case "email":
        this.setState({ businessEmail: event.target.value });
        break;
      case "icNumber":
        this.setState({ nricPassport: event.target.value });
        break;
      case "mobileNo":
        this.setState({ mobileNo: event.target.value });
        break;
      case "gender":
        this.setState({ gender: event.target.value });
        break;
      case "marriageStatus":
        this.setState({ marriageStatus: event.target.value });
        if (event.target.value === "SIN") {
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = true;
        } else {
          ReactDOM.findDOMNode(this.refs["marriageDate"]).disabled = false;
        }
        break;
      case "marriageCount":
        this.setState({ marriageCount: event.target.value });
        break;
      case "marriageDate":
        this.setState({ marriageDate: event.target.value });
        break;
      case "totalChildren":
        this.setState({ totalChildren: event.target.value });
        break;
      case "jobTitle":
        this.setState({ jobTitle: event.target.value });
        break;
      case "businessUnit":
        this.setState({ businessUnit: event.target.value });
        break;
      case "deptId":
        this.setState({ deptId: event.target.value });
        break;
      case "managerId":
        if (event.target.value !== "") {
          let manager = this.getManagerDetails(event.target.value);
          this.setState({ reportsTo: manager });
        } else {
          this.setState({ reportsTo: { emplId: "", name: "" } });
        }
        break;
      case "reportDottedLine":
        if (event.target.value !== "") {
          let manager = this.getManagerDetails(event.target.value);
          this.setState({ reportDottedLine: manager.emplId });
        } else {
          this.setState({ reportDottedLine: "" });
        }
        break;
      case "joinDate":
        this.setState({ joinDate: event.target.value });
        break;
      default:
        break;
    }
  }

  handleOptionChange = changeEvent => {
    if (changeEvent.target.value === "active") {
      this.setState({ status: "A" });
    } else {
      this.setState({ status: "I" });
    }
  };

  handleCheckBoxChange = changeEvent => {
    let newRoles = [];
    if (ReactDOM.findDOMNode(this.refs["EMPLOYEE"]).checked) {
      newRoles.push({ role: "E", roleName: "EMPLOYEE" });
    }

    if (ReactDOM.findDOMNode(this.refs["MANAGER"]).checked) {
      newRoles.push({ role: "M", roleName: "MANAGER" });
    }

    if (ReactDOM.findDOMNode(this.refs["HR"]).checked) {
      newRoles.push({ role: "A", roleName: "HR" });
    }

    this.setState({ roles: newRoles });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    const values = {
      emplId: this.state.emplId,
      name: this.state.name,
      effectiveDate: this.state.effectiveDate,
      reportsTo: this.state.reportsTo,
      reportDottedLine: this.state.reportDottedLine,
      businessEmail: this.state.businessEmail,
      nricPassport: this.state.nricPassport,
      gender: this.state.gender,
      marriageStatus: this.state.marriageStatus,
      marriageCount: this.state.marriageCount,
      marriageDate: this.state.marriageDate,
      totalChildren: this.state.totalChildren,
      jobTitle: this.state.jobTitle,
      mobileNo: this.state.mobileNo,
      businessUnit: this.state.businessUnit,
      deptId: this.state.deptId,
      joinDate: this.state.joinDate,
      status: this.state.status,
      roles: this.state.roles
    };
    const request = Object.assign({}, values);
    fetchData({
      url: API_BASE_URL + "/addEditEmployeeDetails",
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        if (response.emplId !== null) {
          confirmAlert({
            message: "Employee " + response.emplId + " is successfully save",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/liststaffprofile")
              }
            ]
          });
        }

        if (response.emplId === null && values.status === "I") {
          confirmAlert({
            message:
              "Employee " +
              values.emplId +
              " is successfully save and deactivated",
            buttons: [
              {
                label: "OK",
                onClick: () => this.props.history.push("/liststaffprofile")
              }
            ]
          });
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
  };

  componentDidMount() {
    this.loadManagerList();
    this.loadTranslateItem();

    if (this.props.computedMatch.params.emplId) {
      this.loadProfile();
    }
    this.setState({
      loading: false
    });
  }

  clickdiscard = () => {
    this.props.history.push("/liststaffprofile");
  };

  render() {
    const {
      emplId,
      name,
      businessEmail,
      nricPassport,
      gender,
      marriageStatus,
      marriageCount,
      marriageDate,
      totalChildren,
      mobileNo,
      jobTitle,
      deptId,
      businessUnit,
      reportsTo,
      reportDottedLine,
      joinDate,
      status
    } = this.state;
    const edit = this.props.computedMatch.params.emplId ? "Edit" : "Add";

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">{edit} Employee Profile</h3>
          </span>
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <div className="tableContainerFlex">
              <Form ref="form" onSubmit={this.handleFormSubmit}>
                <FormGroup row>
                  <Label for="csiStaffId" sm={2}>
                    Employee ID:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="10"
                      name="csiStaffId"
                      id="csiStaffId"
                      ref="csiStaffId"
                      placeholder="Employee ID"
                      onChange={this.handleChange}
                      onBlur={this.verifyEmplId}
                      value={emplId}
                      required
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
                      maxLength="80"
                      name="staffName"
                      id="staffName"
                      placeholder="Employee Name"
                      onChange={this.handleChange}
                      value={name}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={2}>
                    Business Email:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      maxLength="30"
                      name="email"
                      id="email"
                      ref="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      onBlur={this.verifyEmailExists}
                      value={businessEmail}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="icNumber" sm={2}>
                    NRIC / Passport No.:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="14"
                      name="icNumber"
                      id="icNumber"
                      placeholder="NRIC / Passport No."
                      onChange={this.handleChange}
                      value={nricPassport}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="gender" sm={2}>
                    Gender:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      placeholder="Gender"
                      onChange={this.handleChange}
                      value={gender}
                      required
                    >
                      <option value="">Select Gender</option>
                      {this.state.translateItemList.map(item => {
                        if (
                          item.id.fieldname === "gender" &&
                          item.effStatus === "A"
                        ) {
                          return (
                            <option
                              key={item.id.fieldvalue}
                              value={item.id.fieldvalue}
                            >
                              {item.xlatlongname}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="marriageStatus" sm={2}>
                    Marital Status:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="marriageStatus"
                      id="marriageStatus"
                      placeholder="Gender"
                      onChange={this.handleChange}
                      value={marriageStatus}
                      required
                    >
                      <option value="">Select Marital Status</option>
                      {this.state.translateItemList.map(item => {
                        if (
                          item.id.fieldname === "marriage_status" &&
                          item.effStatus === "A"
                        ) {
                          return (
                            <option
                              key={item.id.fieldvalue}
                              value={item.id.fieldvalue}
                            >
                              {item.xlatlongname}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="marriageDate" sm={2}>
                    Marriage Date:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="marriageDate"
                      id="marriageDate"
                      ref="marriageDate"
                      placeholder="Marriage Date"
                      onChange={this.handleChange}
                      value={marriageDate}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="marriageCount" sm={2}>
                    Marriage Count:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="2"
                      name="marriageCount"
                      id="marriageCount"
                      placeholder="Marriage Count"
                      onChange={event => this.setState({marriageCount: event.target.value.replace(/\D/,'')})}
                      value={marriageCount}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="totalChildren" sm={2}>
                    Total Children:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="2"
                      name="totalChildren"
                      id="totalChildren"
                      placeholder="Total Children"
                      onChange={event => this.setState({totalChildren: event.target.value.replace(/\D/,'')})}
                      value={totalChildren}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="jobTitle" sm={2}>
                    Job Title:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="jobTitle"
                      id="jobTitle"
                      placeholder="Job Title"
                      onChange={this.handleChange}
                      value={jobTitle}
                      required
                    >
                      <option key="" value="">
                        Select Job Title
                      </option>
                      {this.state.translateItemList.map(item => {
                        if (
                          item.id.fieldname === "job_title" &&
                          item.effStatus === "A"
                        ) {
                          return (
                            <option
                              key={item.id.fieldvalue}
                              value={item.id.fieldvalue}
                            >
                              {item.xlatlongname}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="mobileNo" sm={2}>
                    Mobile No.:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      maxLength="15"
                      name="mobileNo"
                      id="mobileNo"
                      placeholder="Mobile No."
                      onChange={this.handleChange}
                      value={mobileNo}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="businessUnit" sm={2}>
                    Business Unit:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="businessUnit"
                      id="businessUnit"
                      onChange={this.handleChange}
                      value={businessUnit}
                      required
                    >
                      <option key="" value="">
                        Select Business Unit
                      </option>
                      {this.state.translateItemList.map(item => {
                        if (
                          item.id.fieldname === "business_unit" &&
                          item.effStatus === "A"
                        ) {
                          return (
                            <option
                              key={item.id.fieldvalue}
                              value={item.id.fieldvalue}
                            >
                              {item.xlatlongname}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="deptId" sm={2}>
                    Department ID:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="deptId"
                      id="deptId"
                      onChange={this.handleChange}
                      value={deptId}
                      required
                    >
                      <option key="" value="">
                        Select Department
                      </option>
                      {this.state.translateItemList.map(item => {
                        if (
                          item.id.fieldname === "dept_id" &&
                          item.effStatus === "A"
                        ) {
                          return (
                            <option
                              key={item.id.fieldvalue}
                              value={item.id.fieldvalue}
                            >
                              {item.xlatlongname}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lineManagerId" sm={2}>
                    Line Manager:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="managerId"
                      id="managerId"
                      onChange={this.handleChange}
                      value={reportsTo.emplId}
                      required
                    >
                      <option key="" value="">
                        Select Line Manager
                      </option>
                      {this.state.managerList.map(manager => {
                        return (
                          <option key={manager.emplId} value={manager.emplId}>
                            {manager.name}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="reportDottedLine" sm={2}>
                    Dotted Line Manager:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      name="reportDottedLine"
                      id="reportDottedLine"
                      onChange={this.handleChange}
                      value={reportDottedLine}
                    >
                      <option key="" value="">
                        Select Line Manager
                      </option>
                      {this.state.managerList.map(manager => {
                        if (manager.emplId !== reportsTo.emplId) {
                          return (
                            <option key={manager.emplId} value={manager.emplId}>
                              {manager.name}
                            </option>
                          );
                        }
                        return true;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="joinDate" sm={2}>
                    Join Date:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="joinDate"
                      id="joinDate"
                      placeholder="Join Date"
                      onChange={this.handleChange}
                      value={joinDate}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="status" sm={2}>
                    Status:
                  </Label>
                  <div className="form-check">
                    <Col sm={10}>
                      <Input
                        type="radio"
                        name="active"
                        value="active"
                        checked={status === "A"}
                        onChange={this.handleOptionChange}
                      />{" "}
                      Active
                    </Col>
                  </div>
                  <div className="form-check">
                    <Col sm={10}>
                      <Input
                        type="radio"
                        name="inactive"
                        value="inactive"
                        checked={status === "I"}
                        onChange={this.handleOptionChange}
                      />{" "}
                      Inactive
                    </Col>
                  </div>
                </FormGroup>
                <FormGroup row>
                  <Label for="role" sm={2}>
                    Role:
                  </Label>
                  <div className="form-check">
                    <Col sm={10}>
                      <Input
                        type="checkbox"
                        name="EMPLOYEE"
                        ref="EMPLOYEE"
                        value="EMPLOYEE"
                        checked
                        disabled
                        onChange={this.handleCheckBoxChange}
                      />{" "}
                      Employee
                    </Col>
                  </div>
                  <div className="form-check">
                    <Col sm={10}>
                      <Input
                        type="checkbox"
                        name="MANAGER"
                        ref="MANAGER"
                        value="MANAGER"
                        onChange={this.handleCheckBoxChange}
                      />{" "}
                      Manager
                    </Col>
                  </div>
                  <div className="form-check">
                    <Col sm={10}>
                      <Input
                        type="checkbox"
                        name="HR"
                        ref="HR"
                        value="HR"
                        onChange={this.handleCheckBoxChange}
                      />{" "}
                      Admin
                    </Col>
                  </div>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button
                      // type="button"
                      color="primary"
                      className="largeButtonOverride"
                    >
                      Save
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="secondary" onClick={this.clickdiscard}>
                      Cancel
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(NewStaffProfile);
