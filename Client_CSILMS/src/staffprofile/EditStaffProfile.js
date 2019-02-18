import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../common/Styles.css";
import { fetchData, formatDateYMD } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class EditStaffProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emplId: "",
      name: "",
      businessEmail: "",
      nricPassport: "",
      jobTitle: "",
      mobileNo: "",
      businessUnit: "",
      lineManager: "",
      joinDate: "",
      status: "",
    };
    this.toggleCancel = this.toggleCancel.bind(this);
  }

  toggleCancel() {
    this.setState(prevState => ({
      modalCancel: !prevState.modalCancel
    }));
  }

  componentDidMount() {
    const {
      emplId
    } = this.props.computedMatch.params;

    fetchData({
      url:
        API_BASE_URL +
        "/employeedetails/" +
        emplId,
      method: "GET"
    })
      .then(data => {
        console.log("Fetched Data", data);
        this.setState({
          emplId: data.emplId,
          name: data.name,
          businessEmail: data.businessEmail,
          nricPassport: data.nricPassport,
          jobTitle: data.jobTitle,
          mobileNo: data.mobileNo,
          businessUnit: data.businessUnit,
          lineManager: data.reportsTo.name,
          joinDate: data.joinDate,
          status: data.status
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      emplId,
      name,
      businessEmail,
      nricPassport,
      jobTitle,
      mobileNo,
      businessUnit,
      lineManager,
      joinDate,
      status
    } = this.state;
   // console.log("State", this.state);
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Employee Profile</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form onSubmit={this.handleFormSubmit}>
            <FormGroup>
              <Label for="csiStaffId">CSI Staff ID</Label>
              <Input
                type="text"
                name="csiStaffId"
                id="csiStaffId"
                value={emplId}
              />
            </FormGroup>
            <FormGroup>
              <Label for="staffName">Staff Name</Label>
              <Input
                type="text"
                name="staffName"
                id="staffName"
                value={name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={businessEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label for="icNumber">NRIC / Passport No.</Label>
              <Input
                type="text"
                name="icNumber"
                id="icNumber"
                value={nricPassport}
              />
            </FormGroup>
            <FormGroup>
              <Label for="jobTitle">Job Title</Label>
              <Input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={jobTitle}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mobileNo">Mobile No.</Label>
              <Input
                type="text"
                name="mobileNo"
                id="mobileNo"
                value={mobileNo}
              />
            </FormGroup>
            <FormGroup>
              <Label for="businessUnit">Business Unit</Label>
              <Input
                type="text"
                name="businessUnit"
                id="businessUnit"
                value={businessUnit}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lineManagerId">Line Manager</Label>
              <Input
                type="text"
                name="lineManagerId"
                id="lineManagerId"
                value={lineManager}
              />
            </FormGroup>
            <FormGroup>
              <Label for="joinDate">Join Date</Label>
              <Input
                type="date"
                name="joinDate"
                id="joinDate"
                value={formatDateYMD(joinDate)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <div className="form-check">
                <Input
                  type="radio"
                  name="active"
                  value={(status === "A")}
                />
                Active
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="inactive"
                  value="inactive"
                  checked={this.state.selectedOption === "inactive"}
                  onChange={this.handleOptionChange}
                />
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
            <Button color="primary"
              className="largeButtonOverride"
            >
              Save
                </Button>
            &nbsp;&nbsp;
            <Button color="secondary" onClick={this.toggleCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default EditStaffProfile;
