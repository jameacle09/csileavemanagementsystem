import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "../common/Styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchData } from '../util/APIUtils';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../constants'; 

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
  }

  onDismiss() {
    this.setState({ visibleFailed: false,
                    visibleSuccess: false
                });
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
      method: 'POST',
      body: JSON.stringify(request)
    }).then(response => {
      console.log(response.message);
      if(response.message === "FAILED"){
        this.setState({visibleFailed:true,
                        currentPassword:"",
                        password:"",
                        confirmPassword:""});
      } else if(response.message === "SUCCESS"){
        this.setState({visibleSuccess:true,
                        currentPassword:"",
                        password:"",
                        confirmPassword:""});
      }
    }).catch(error => {
      if(error.status === 401) {
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

    const {
      currentPasswordType,
      passwordType,
      confirmPasswordType,
      currentPassword,
      password,
      confirmPassword
    } = this.state;

    let show = (<FontAwesomeIcon icon="eye" />);
    let hide = (<FontAwesomeIcon icon="eye-slash" />);

    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">Change Password</h3>
          </span>
        </div>
        <br />
        <div className="container" style={divStyle}>
        <Alert color="danger" isOpen={this.state.visibleFailed} toggle={this.onDismiss}>
            Sorry! Failed to change new password due to invalid current password.
        </Alert>
        <Alert color="info" isOpen={this.state.visibleSuccess} toggle={this.onDismiss}>
            You have successfully change new password.
        </Alert>
          <Form onSubmit={e => this.submitForm(e)} name="form">
            <FormGroup>
              <Label for="currentPassword" align="left">
                Current Password
              </Label>
              <div className="input-group mb-3">
                <Input
                  style={inputStyle}
                  type={currentPasswordType}
                  name="currentPassword"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={this.handleChange}
                  aria-label="currentPassword"
                  aria-describedby="basic-addon2"
                  autoFocus required
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
                    {currentPasswordType === "input" ? show : hide}
                  </span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="password">New Password</Label>
              <div className="input-group mb-3">
                <Input
                  style={inputStyle}
                  type={passwordType}
                  name="password"
                  id="password"
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
                    id="basic-addon2"
                    onClick={event => this.showHide(event, "passwordType")}
                    color="primary"
                  >
                    {passwordType === "input" ? show : hide}
                  </span>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm New Password</Label>
              <div className="input-group mb-3">
                <Input
                  style={inputStyle}
                  type={confirmPasswordType}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={this.handleChange}
                  onBlur={this.validatePassword}
                  value={confirmPassword}
                  aria-label="confirmPassword"
                  aria-describedby="basic-addon2"
                  required
                  pattern="^\S{8,}$"
                  title="8 characters minimum"
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
                    {confirmPasswordType === "input" ? show : hide}
                  </span>
                </div>
              </div>
            </FormGroup>
            <br />
            <Button
              color="primary"
              type="submit"            
              style={{ textTransform: 'none', float: 'right', backgroundColor: '#3F51B5', color: 'white' }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassword);
