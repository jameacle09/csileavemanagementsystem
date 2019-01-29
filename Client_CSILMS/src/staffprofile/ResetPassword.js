import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from '@material-ui/core/Button';
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
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </FormGroup>
            <Button variant="contained" color="primary" style={{ textTransform: 'none' }}>Save</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
