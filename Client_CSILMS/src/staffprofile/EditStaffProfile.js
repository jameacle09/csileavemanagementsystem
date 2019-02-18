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
      roles: ""
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
          status: data.status,
          roles: data.roles.role
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
      status,
      roles
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
              <Label for="emplId">CSI Staff ID</Label>
              <Input
                type="text"
                name="emplId"
                id="emplId"
                value={emplId}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Staff Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="businessEmail">Email</Label>
              <Input
                type="email"
                name="businessEmail"
                id="businessEmail"
                value={businessEmail}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nricPassport">NRIC / Passport No.</Label>
              <Input
                type="text"
                name="nricPassport"
                id="nricPassport"
                value={nricPassport}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="jobTitle">Job Title</Label>
              <Input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={jobTitle}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mobileNo">Mobile No.</Label>
              <Input
                type="text"
                name="mobileNo"
                id="mobileNo"
                value={mobileNo}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="businessUnit">Business Unit</Label>
              <Input
                type="text"
                name="businessUnit"
                id="businessUnit"
                value={businessUnit}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lineManager">Line Manager</Label>
              <Input
                type="text"
                name="lineManager"
                id="lineManager"
                value={lineManager}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="joinDate">Join Date</Label>
              <Input
                type="date"
                name="joinDate"
                id="joinDate"
                value={formatDateYMD(joinDate)}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <div className="form-check">
                <Input
                  type="radio"
                  name="active"
                  checked={status === "A"}
                  onChange={this.handleChange}
                />
                Active
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="inactive"
                  value="inactive"
                  checked={status === "I"}
                  onChange={this.handleChange}
                />
                Inactive
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <div className="form-check">
                <Input
                  type="checkbox"
                  name="employee"
                  value={roles} />
                Employee
              </div>
              <div className="form-check">
                <Input
                  type="checkbox"
                  name="manager"
                  value={roles} />
                Manager
              </div>
              <div className="form-check">
                <Input
                  type="checkbox"
                  name="admin"
                  value={roles} /> Admin
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
