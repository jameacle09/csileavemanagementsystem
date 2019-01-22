import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./MyProfile.css";
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPasswordType: "password",
            passwordType: "password",
            confirmPasswordType: "password"
        };
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
            background: "#eee",
            padding: "20px",
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        const {
            currentPasswordType,
            passwordType,
            confirmPasswordType
        } = this.state;
        return (
            <div>
                <br />
                <div className="container" style={divStyle}>
                    <Form>
                        <FormGroup>
                            <Label for="currentPassword">Current Password</Label>
                            <Input
                                type={currentPasswordType}
                                name="currentpassword"
                                id="passcurrentpassword"
                                placeholder="Current Password"
                            />
                            <div className="container_password_show">
                                <span
                                    className="password__show"
                                    onClick={event => this.showHide(event, "currentPasswordType")}
                                    color="primary"
                                >
                                    {currentPasswordType === "input" ? "Hide" : "Show"}
                                </span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Change Password</Label>
                            <Input
                                type={passwordType}
                                name="password"
                                id="password"
                                placeholder="Change Password"
                            />
                            <div className="container_password_show">
                                <span
                                    className="password__show"
                                    onClick={event => this.showHide(event, "passwordType")}
                                    color="primary"
                                >
                                    {passwordType === "input" ? "Hide" : "Show"}
                                </span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input
                                type={confirmPasswordType}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                            />
                            <div className="container_password_show">
                                <span
                                    className="password__show"
                                    onClick={event => this.showHide(event, "confirmPasswordType")}
                                    color="primary"
                                >
                                    {confirmPasswordType === "input" ? "Hide" : "Show"}
                                </span>
                            </div>
                        </FormGroup>
                        <br />
                        <Button color="primary">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

//ReactDOM.render(<ChangePassword />, document.getElementById("react"));
export default ChangePassword;