import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import Button from '@material-ui/core/Button';
import "../common/Styles.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const initialState = {
  userId: "",
  emplId: "",
  emplName: "",
  password: "",
  confirmPassword: "",
  lockAccount: ""
};

class UserProfile extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { userId, emplId, emplName, password, confirmPassword } = this.state;
    const isInvalid =
      !userId ||
      !emplId ||
      !emplName ||
      !password ||
      password !== confirmPassword;
    return isInvalid;
  };

  clickDiscard = () => {
    confirmAlert({
      message: "Do you want to cancel this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.history.push("/logindetails")
        },
        {
          label: "No"
        }
      ]
    });
  };

  render() {
    const { userId, emplId, emplName, password, confirmPassword } = this.state;
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit User Login Details</h3>
          </span>
        </div>
        <div className="tableContainerFlex">
          <Form>
            <FormGroup>
              <Label for="userId">User ID</Label>
              <Input
                type="email"
                name="userId"
                id="userId"
                placeholder="User ID"
                value={userId}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="emplId">Employee ID</Label>
              <Input
                type="text"
                name="emplId"
                id="emplId"
                placeholder="Employee ID"
                value={emplId}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="emplName">Employee Name</Label>
              <Input
                type="text"
                name="emplName"
                id="emplName"
                placeholder="Employee Name"
                value={emplName}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="lockAccount" id="lockAccount" />
                Lock Account?
              </Label>
            </FormGroup>
            <br />
            <Button
              color="primary"
              style={{ backgroundColor: "#3F51B5", color: "white" }}
              disabled={this.validateForm()}
            >
              Save
            </Button>
            &nbsp;&nbsp;
            <Button onClick={this.clickDiscard}>Discard</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default UserProfile;
