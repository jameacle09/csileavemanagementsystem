import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import SideBar from "../hradmin/SideBar";
import "../common/Styles.css";

class ResetPassword extends Component {
  render() {
    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Reset Password</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Form>
            <FormGroup>
              <Label for="newPassword">New Password</Label>
              <Input
                type="text"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </FormGroup>
            <Button color="primary">Save</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
