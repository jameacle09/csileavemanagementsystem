import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchData } from "../util/APIUtils";
import { withRouter, Redirect } from "react-router-dom";
import { API_BASE_URL, FIRST_TIME, ACCESS_TOKEN } from "../constants";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../common/Styles.css";
library.add(fas);

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPasswordType: "password",
      passwordType: "password",
      confirmPasswordType: "password",
      currentPassword: "",
      password: "",
      confirmPassword: "",
      visibleFailed: false,
      visibleSuccess: false
    };

    this.validatePassword = this.validatePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.removedFirstTimeLogin = this.removedFirstTimeLogin.bind(this);
  }

  removedFirstTimeLogin() {
    if (localStorage.getItem(FIRST_TIME) === "YES") {
      localStorage.removeItem(FIRST_TIME);
      this.props.history.push("/");
    }
  }

  onDismiss() {
    this.setState({ visibleFailed: false, visibleSuccess: false });
  }

  submitForm(e) {
    e.preventDefault();
    const values = {
      password: this.state.currentPassword,
      newPassword: this.state.password
    };

    const request = Object.assign({}, values);

    fetchData({
      url: API_BASE_URL + "/changePassword",
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        if (response.message === "FAILED") {
          this.setState({
            visibleFailed: true,
            currentPassword: "",
            password: "",
            confirmPassword: ""
          });
        } else if (response.message === "SUCCESS") {
          this.setState({
            visibleSuccess: true,
            currentPassword: "",
            password: "",
            confirmPassword: ""
          });
          this.removedFirstTimeLogin();
        }
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validatePassword(event) {
    if (event.target.name === "confirmPassword") {
      this.setState({ confirmPassword: event.target.value });
      if (event.target.value !== this.state.password) {
        event.target.setCustomValidity("Passwords Don't Match");
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

  handleCancel = () => {
    this.props.history.push("/");
  };

  render() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return <Redirect to="/login" />;
    }

    const changePasswordLabel = {
      font: "Helvetica",
      fontSize: "17px",
      // fontWeight: "bold",
      color: "#032a53"
    };

    const changePasswordInput = {
      font: "Helvetica",
      color: "#004a9b",
      fontSize: "17px",
      // fontWeight: "bold",
      height: "36px",
      borderLeft: "none",
      borderRight: "none",
      borderTop: "none",
      borderBottom: "1px solid #004a9b",
      borderRadius: "0"
    };

    const showHideButton = {
      height: "36px",
      color: "white",
      background: "#004a9b"
    };

    const {
      currentPasswordType,
      passwordType,
      confirmPasswordType,
      currentPassword,
      password,
      confirmPassword
    } = this.state;

    let show = <FontAwesomeIcon icon="eye" />;
    let hide = <FontAwesomeIcon icon="eye-slash" />;

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Change Password</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Form onSubmit={e => this.submitForm(e)} name="form">
            <div className="changePasswordContainer">
              <Alert
                color="danger"
                isOpen={this.state.visibleFailed}
                toggle={this.onDismiss}
              >
                Password change has failed due to invalid Current Password.
              </Alert>
              <Alert
                color="info"
                isOpen={this.state.visibleSuccess}
                toggle={this.onDismiss}
              >
                Your password has been successfully updated.
              </Alert>

              <FormGroup row>
                <Label
                  for="currentPassword"
                  align="left"
                  style={changePasswordLabel}
                  sm={3}
                >
                  Current Password:
                </Label>
                <Col sm={9}>
                  <div
                    className="input-group mb-3"
                    style={{
                      height: "40px",
                      paddingBottom: "2px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Input
                      type={currentPasswordType}
                      name="currentPassword"
                      id="currentPassword"
                      style={changePasswordInput}
                      value={currentPassword}
                      onChange={this.handleChange}
                      aria-label="currentPassword"
                      aria-describedby="basic-addon2"
                      autoFocus
                      required
                    />
                    <div className="container_password_show input-group-append">
                      <span
                        className="password__show input-group-text"
                        style={showHideButton}
                        id="basic-addon2"
                        onClick={event =>
                          this.showHide(event, "currentPasswordType")
                        }
                      >
                        {currentPasswordType === "input" ? show : hide}
                      </span>
                    </div>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" style={changePasswordLabel} sm={3}>
                  New Password:
                </Label>
                <Col sm={9}>
                  <div
                    className="input-group mb-3"
                    style={{
                      height: "40px",
                      paddingBottom: "2px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Input
                      type={passwordType}
                      name="password"
                      id="password"
                      style={changePasswordInput}
                      onChange={this.handleChange}
                      value={password}
                      aria-label="password"
                      aria-describedby="basic-addon2"
                      required
                      pattern="^\S{8,}$"
                      title="8 characters minimum"
                    />
                    <div className="container_password_show input-group-append">
                      <span
                        className="password__show input-group-text"
                        style={showHideButton}
                        id="basic-addon2"
                        onClick={event => this.showHide(event, "passwordType")}
                      >
                        {passwordType === "input" ? show : hide}
                      </span>
                    </div>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="confirmPassword" style={changePasswordLabel} sm={3}>
                  Confirm New Password:
                </Label>
                <Col sm={9}>
                  <div className="input-group mb-3">
                    <Input
                      type={confirmPasswordType}
                      name="confirmPassword"
                      id="confirmPassword"
                      style={changePasswordInput}
                      onChange={this.handleChange}
                      onBlur={this.validatePassword}
                      value={confirmPassword}
                      aria-label="confirmPassword"
                      aria-describedby="basic-addon2"
                      required
                      pattern="^\S{8,}$"
                      title="8 characters minimum"
                    />
                    <div
                      className="container_password_show input-group-append"
                      style={{
                        height: "40px",
                        paddingBottom: "2px",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span
                        className="password__show input-group-text"
                        style={showHideButton}
                        id="basic-addon2"
                        onClick={event =>
                          this.showHide(event, "confirmPasswordType")
                        }
                        color="primary"
                      >
                        {confirmPasswordType === "input" ? show : hide}
                      </span>
                    </div>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={{ size: 9, offset: 3 }}>
                  <Button
                    color="primary"
                    type="submit"
                    className="largeButtonOverride"
                  >
                    Change Password
                  </Button>
                  <span> </span>
                  <Button
                    color="primary"
                    className="largeButtonOverride"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </FormGroup>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassword);
