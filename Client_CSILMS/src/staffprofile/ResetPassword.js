import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import SideBar from "../hradmin/SideBar";
import "../common/Styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: "password",
      newPassword: "",
      confirmPassword: ""
    };
    this.validatePassword = this.validatePassword.bind(this);
  }

  validatePassword(event) {
    if (event.target.name === "newPassword") {
      this.setState({ newPassword: event.target.value });
    }

    if (event.target.name === "confirmPassword") {
      this.setState({ confirmPassword: event.target.value });
      if (event.target.value !== this.state.newPassword) {
        event.target.setCustomValidity("Password not match");
      } else {
        event.target.setCustomValidity("");
      }
    }
  }
  showHide(e, controlName) {
    e.preventDefault();
    e.stopPropagation();
    if (controlName === "passwordType") {
      this.setState({
        passwordType: this.state.passwordType === "input" ? "password" : "input"
      });
    }
  }
  render() {
    const divStyle = {
      maxWidth: "400px",
      position: "relative",
      left: "auto",
      right: "auto",
      background: "white",
      padding: "20px 30px 60px 30px",
      boxShadow: "5px 5px 5px rgb(63, 84, 105)",
      border: "1px solid gray",
      borderRadius: "5px",
      textAlign: "left"
    };
    const inputStyle = {
      borderLeft: "none",
      borderRight: "none",
      borderTop: "none",
      borderRadius: "0",
      fontSize: "15px",
      height: "20px"
    };
    const submitButtonStyle = {
      textAlign: "center",
      display: "inline-block",
      width: "150px",
      float: "right"
    };
    const {
      passwordType,
      newPassword,
      confirmPassword
    } = this.state;

    let show = (<FontAwesomeIcon icon="eye" />);
    let hide = (<FontAwesomeIcon icon="eye-slash" />);

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Reset Password</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex" style={divStyle}>
          <Form>
            <FormGroup>
              <Label for="newPassword">New Password</Label>
              <div className="input-group mb-3">
              <Input
                style={inputStyle}
                type={passwordType}
                name="newPassword"
                id="newPassword"
                aria-label="newpassword"
                aria-describedby="basic-addon2"
                onChange={this.validatePassword}
                autoFocus
                required
              />
              <div className="container_password_show input-group-append">
                  <span
                    className="password__show input-group-text"
                    id="basic-addon2"
                    onClick={event =>
                      this.showHide(event, "passwordType")
                    }
                    color="primary"
                  >
                    {passwordType === "input" ? show : hide}
                  </span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <div className="input-group mb-3">
              <Input
                style={inputStyle}
                type={passwordType}
                name="confirmPassword"
                id="confirmPassword"
                aria-label="confirmPassword"
                aria-describedby="basic-addon2"
                onChange={this.validatePassword}
                required
              />
              <div className="container_password_show input-group-append">
                  <span
                    className="password__show input-group-text"
                    id="basic-addon2"
                    onClick={event =>
                      this.showHide(event, "passwordType")
                    }
                    color="primary"
                  >
                    {passwordType === "input" ? show : hide}
                  </span>
                </div>
                </div>
            </FormGroup>
            <Button color="primary" style={submitButtonStyle} onSubmit={this.validatePassword}>Save</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;