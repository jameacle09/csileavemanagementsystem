import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./MyProfile.css";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPasswordType: "password",
      passwordType: "password",
      confirmPasswordType: "password",
      password: "",
      confirmPassword: ""
    };
    this.validatePassword = this.validatePassword.bind(this);
  }

  validatePassword(event) {
    if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }

    if (event.target.name === "confirmPassword") {
      this.setState({ confirmPassword: event.target.value });
      if (event.target.value !== this.state.password) {
        event.target.setCustomValidity("Password not match");
      } else {
        event.target.setCustomValidity("");
      }
    }
  }

  showHide(e, controlName) {
    e.preventDefault();
    e.stopPropagation();
    if (controlName === "currentPasswordType") {
      this.setState({
        currentPasswordType:
          this.state.currentPasswordType === "input" ? "password" : "input"
      });
    }
    if (controlName === "passwordType") {
      this.setState({
        passwordType: this.state.passwordType === "input" ? "password" : "input"
      });
    }
    if (controlName === "confirmPasswordType") {
      this.setState({
        confirmPasswordType:
          this.state.confirmPasswordType === "input" ? "password" : "input"
      });
    }
  }
  render() {
    const divStyle = {
      maxWidth: "600px",
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

    // const pTextStyle = {
    //   fontWeight: "bold",
    //   fontSize: "20px",
    //   textAlign: "center",
    //   width: "119%",
    //   margin: "0 0 20px -30px",
    //   padding: "0 0 5px 0"
    // };

    const submitButtonStyle = {
      textAlign: "center",
      display: "inline-block",
      width: "150px",
      float: "right"
    };

    const {
      currentPasswordType,
      passwordType,
      confirmPasswordType,
      password,
      confirmPassword
    } = this.state;

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Change Password</h3>
          </span>
        </div>
        <br />
        <div className="container" style={divStyle}>
          <Form>
            <FormGroup>
              <Label for="currentPassword" align="left">
                Current Password
              </Label>
              <div className="input-group mb-3">
                <Input
                  style={inputStyle}
                  type={currentPasswordType}
                  name="currentpassword"
                  id="passcurrentpassword"
                  aria-label="passcurrentpassword"
                  aria-describedby="basic-addon2"
                />
                <div className="container_password_show input-group-append">
                  <span
                    className="password__show input-group-text"
                    id="basic-addon2"
                    onClick={event =>
                      this.showHide(event, "currentPasswordType")
                    }
                    color="primary"
                  >
                    {currentPasswordType === "input" ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="password">Change Password</Label>
              <div className="input-group mb-3">
                <Input
                  style={inputStyle}
                  type={passwordType}
                  name="password"
                  id="password"
                  onChange={this.validatePassword}
                  value={password}
                  aria-label="password"
                  aria-describedby="basic-addon2"
                />
                <div className="container_password_show input-group-append">
                  <span
                    className="password__show input-group-text"
                    id="basic-addon2"
                    onClick={event => this.showHide(event, "passwordType")}
                    color="primary"
                  >
                    {passwordType === "input" ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <div className="input-group mb-3">
                <Input
                  style={inputStyle}
                  type={confirmPasswordType}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={this.validatePassword}
                  value={confirmPassword}
                  aria-label="confirmPassword"
                  aria-describedby="basic-addon2"
                />
                <div className="container_password_show input-group-append">
                  <span
                    className="password__show input-group-text"
                    id="basic-addon2"
                    onClick={event =>
                      this.showHide(event, "confirmPasswordType")
                    }
                    color="primary"
                  >
                    {confirmPasswordType === "input" ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
            </FormGroup>
            <br />
            <Button
              color="primary"
              style={submitButtonStyle}
              onSubmit={this.validatePassword}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<ChangePassword />, document.getElementById("react"));
export default ChangePassword;
