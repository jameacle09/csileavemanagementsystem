import React, { Component } from "react";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ACCESS_TOKEN } from "../constants";
import { login } from "../util/APIUtils";
import { withRouter } from "react-router-dom";
import "./Login.css";
import { FormErrors } from "./LoginError";
import CSILogo from "../img/CSI_Logo.png";
import ChromeLogo from "../img/chrome.jpg";
import FirefoxLogo from "../img/firefox.jpg";

let isFirefox = typeof InstallTrigger !== "undefined";
let isChrome = !!window.chrome && !!window.chrome.webstore;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: "",
      password: "",
      formErrors: { email: "", password: "", loginfailed: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateFields = () => {
    const { email, password } = this.state;
    const isInvalid = !email || !password;
    return isInvalid;
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "E-mail is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  submitForm(e) {
    e.preventDefault();
    const values = {
      email: this.state.email,
      password: this.state.password
    };

    const loginRequest = Object.assign({}, values);
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.props.onLogin();
      })
      .catch(error => {
        let fieldValidationErrors = this.state.formErrors;
        if (error.status === 401) {
          fieldValidationErrors.loginfailed =
            "Your Username or Password is incorrect. Please try again!";
          this.setState({ formErrors: fieldValidationErrors });
        } else {
          if (error.message === "LOCKED") {
            fieldValidationErrors.loginfailed =
              "Sorry! Your login account currently locked!";
          } else {
            fieldValidationErrors.loginfailed =
              "Sorry! Something went wrong. Please try again!";
          }

          this.setState({ formErrors: fieldValidationErrors });
        }
      });
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  render() {
    const { email, password } = this.state;

    const textInputStyle = {
      fontSize: "18px",
      border: "1px solid rgb(95, 116, 136)",
      borderRadius: "20px",
      height: "40px",
      boxShadow: "3px 3px 3px rgb(95, 116, 136)",
      color: "#032a53"
    };

    const buttonLoginStyle = {
      fontSize: "18px",
      border: "1px solid #004a9b",
      borderRadius: "20px",
      width: "100%",
      height: "40px",
      background: "#004a9b",
      boxShadow: "3px 3px 3px rgb(95, 116, 136)"
    };

    return (
      <div className="loginMainContainer">
        <div className="loginTextContainer">
          <div className="loginTextSubContainer">
            <img
              src={CSILogo}
              alt="CSI Interfusion Logo"
              style={{ padding: "0 0 16px 0" }}
            />
            <br />
            <h4 style={{ color: "rgb(214, 209, 209)" }}>
              CSI Interfusion Sdn. Bhd.
            </h4>
            <br />
            <br />
            <div className="loginSystemTitleContainer">
              Leave Management System
            </div>
            {/* <h2>Leave Management System</h2> */}
            <div className="loginTextMessageContainer">
              <p>
                Please login to submit your Leave Request or you may reach out
                to the HR Department to request for your own access.
              </p>
              {isFirefox || isChrome ? (
                ""
              ) : (
                <React.Fragment>
                  <br />
                  <span
                    style={{
                      fontFamily: "Helvetica",
                      fontStyle: "italic",
                      fontSize: "14px",
                      color: "rgb(214, 209, 209)"
                    }}
                  >
                    Some features of this site doesn't work well with this
                    browser. It is highly recommended that you use &nbsp;
                    <a
                      href="https://www.google.com/chrome/"
                      className="browserLink"
                    >
                      <img
                        src={ChromeLogo}
                        alt="Chrome"
                        style={{ height: "14px", width: "14px" }}
                      />
                      Google Chrome
                    </a>{" "}
                    or &nbsp;
                    <a href="https://www.mozilla.org" className="browserLink">
                      <img
                        src={FirefoxLogo}
                        alt="Firefox"
                        style={{ height: "14px", width: "14px" }}
                      />
                      Mozilla Firefox
                    </a>{" "}
                    browsers to enjoy all features and best performance of this
                    site.
                  </span>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="loginContainer" align="left">
          <div className="loginBox">
            <div className="loginBoxHeader">
              <h2 align="center">Sign In</h2>
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <Form onSubmit={e => this.submitForm(e)}>
              <Col>
                <FormGroup>
                  <Label for="email">User ID (E-mail)</Label>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="myemail@email.com"
                    value={email}
                    // onChange={this.handleUserInput}
                    onChange={this.handleChange}
                    style={textInputStyle}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="Password"
                    placeholder="********"
                    value={password}
                    // onChange={this.handleUserInput}
                    onChange={this.handleChange}
                    style={textInputStyle}
                  />
                </FormGroup>
              </Col>
              <div className="loginBoxFooter" align="center">
                <Col>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={buttonLoginStyle}
                    disabled={this.validateFields()}
                  >
                    Login
                  </Button>
                </Col>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
