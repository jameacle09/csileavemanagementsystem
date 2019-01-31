import React, { Component } from "react";
import StaffProfile from "./StaffProfile";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../common/Styles.css";

class NewStaffProfile extends Component {
  constructor(props) {
    super(props);
    this.id = "";
    this.csiStaffId = "";
    this.staffName = "";
    this.email = "";
    this.icNumber = "";
    this.jobTitle = "";
    this.mobileNo = "";
    this.businessUnit = "";
    this.lineManagerId = "";
    this.joinDate = "";
    this.csiStaffIdHandler = this.csiStaffIdHandler.bind(this);
    this.staffNameHandler = this.staffNameHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.icNumberHandler = this.icNumberHandler.bind(this);
    this.jobTitleHandler = this.jobTitleHandler.bind(this);
    this.mobileNoHandler = this.mobileNoHandler.bind(this);
    this.businessUnitHandler = this.businessUnitHandler.bind(this);
    this.lineManagerIdHandler = this.lineManagerIdHandler.bind(this);
    this.joinDateHandler = this.joinDateHandler.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      selectedOption: "active"
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
  };

  csiStaffIdHandler(event) {
    this.csiStaffId = event.target.value;
  }

  staffNameHandler(event) {
    this.staffName = event.target.value;
  }

  emailHandler(event) {
    this.email = event.target.value;
  }

  icNumberHandler(event) {
    this.icNumber = event.target.value;
  }

  jobTitleHandler(event) {
    this.jobTitle = event.target.value;
  }

  mobileNoHandler(event) {
    this.mobileNo = event.target.value;
  }

  businessUnitHandler(event) {
    this.businessUnit = event.target.value;
  }

  lineManagerIdHandler(event) {
    this.lineManagerId = event.target.value;
  }

  joinDateHandler(event) {
    this.joinDate = event.target.value;
  }

  save() {
    let staffProfile = new StaffProfile(
      0,
      this.csiStaffId,
      this.staffName,
      this.email,
      this.icNumber,
      this.jobTitle,
      this.mobileNo,
      this.businessUnit,
      this.lineManagerId,
      this.joinDate
    );
    console.log(JSON.stringify(staffProfile));
    fetch("http://localhost/api/staffprofile", {
      method: "post",
      body: JSON.stringify(staffProfile),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.props.showStaffProfiles();
    });
  }

  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Add Employee Profile</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form onSubmit={this.handleFormSubmit}>
            <div width="100%" align="right">
              <Button
                component={Link}
                to="/resetpassword"
                variant="contained"
                color="primary"
                style={{ textTransform: "none", color: "white" }}
              >
                Reset Password
              </Button>
            </div>
            <FormGroup>
              <Label for="csiStaffId">CSI Staff ID</Label>
              <Input
                type="text"
                name="csiStaffId"
                id="csiStaffId"
                placeholder="CSI Staff ID"
                onChange={this.csiStaffIdHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="staffName">Staff Name</Label>
              <Input
                type="text"
                name="staffName"
                id="staffName"
                placeholder="Staff Name"
                onChange={this.staffNameHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={this.emailHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="icNumber">NRIC / Passport No.</Label>
              <Input
                type="text"
                name="icNumber"
                id="icNumber"
                placeholder="NRIC / Passport No."
                onChange={this.icNumberHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="jobTitle">Job Title</Label>
              <Input
                type="text"
                name="jobTitle"
                id="jobTitle"
                placeholder="Job Title"
                onChange={this.jobTitleHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mobileNo">Mobile No.</Label>
              <Input
                type="text"
                name="mobileNo"
                id="mobileNo"
                placeholder="Mobile No."
                onChange={this.mobileNoHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="businessUnit">Business Unit</Label>
              <Input
                type="text"
                name="businessUnit"
                id="businessUnit"
                placeholder="Business Unit"
                onChange={this.businessUnitHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lineManagerId">Line Manager</Label>
              <Input
                type="text"
                name="lineManagerId"
                id="lineManagerId"
                placeholder="Line Manager"
                onChange={this.lineManagerIdHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="joinDate">Join Date</Label>
              <Input
                type="date"
                name="joinDate"
                id="joinDate"
                placeholder="Join Date"
                onChange={this.joinDateHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <div className="form-check">
                <Input
                  type="radio"
                  name="active"
                  value="active"
                  checked={this.state.selectedOption === "active"}
                  onChange={this.handleOptionChange}
                />{" "}
                Active
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="inactive"
                  value="inactive"
                  checked={this.state.selectedOption === "inactive"}
                  onChange={this.handleOptionChange}
                />{" "}
                Inactive
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <div className="form-check">
                <Input type="checkbox" name="employee" value="employee" />{" "}
                Employee
              </div>
              <div className="form-check">
                <Input type="checkbox" name="manager" value="manager" /> Manager
              </div>
              <div className="form-check">
                <Input type="checkbox" name="admin" value="admin" /> Admin
              </div>
            </FormGroup>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={this.save}
              style={{ textTransform: "none", color: "white" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default NewStaffProfile;
