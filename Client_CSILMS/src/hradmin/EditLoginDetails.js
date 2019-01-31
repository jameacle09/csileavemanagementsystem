import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import Button from '@material-ui/core/Button';
import "../common/Styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class UserProfile extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Edit Login Details</h3>
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="emplid">Employee ID</Label>
              <Input
                type="text"
                name="emplId"
                id="emplId"
                placeholder="Employee ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="staffName">Employee Name</Label>
              <Input
                type="text"
                name="emplName"
                id="emplName"
                placeholder="Employee Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="newPassword">Password</Label>
              <Input
                type="password"
                name="assword"
                id="password"
                placeholder="Password"
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
              onSubmit={this.validatePassword}
            >
              Save
            </Button>
            &nbsp;&nbsp;
            <Button
              color="primary"
              style={{ backgroundColor: "#3F51B5", color: "white" }}
              onSubmit={this.validatePassword}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default UserProfile;
