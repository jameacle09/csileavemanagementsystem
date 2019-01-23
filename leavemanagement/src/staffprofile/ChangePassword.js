import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'password': '',
            'confirmPassword': ''
        };

        this.validatePassword = this.validatePassword.bind(this);
    }

    validatePassword(event) {
        if (event.target.name == 'password') {
            this.setState({password: event.target.value});
        }
        
        if (event.target.name == 'confirmPassword') {
            this.setState({confirmPassword: event.target.value});
            if(event.target.value != this.state.password) {
                event.target.setCustomValidity("Password not match")
            } else {
                event.target.setCustomValidity("")
            }
       }
    }

render() {
    const divStyle = {
        width: "30%",
        position: "relative",
        left: "auto",
        right: "auto",
        background: "white",
        padding: "20px 30px 60px 30px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "2%"
    };

    const inputStyle = {
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderRadius: "0",
        fontSize: "15px",
        height: "20px"
    };

    const pTextStyle = {
        fontWeight: "bold",
        fontSize: "20px",
        textAlign: "center",
        width: "119%",
        margin: "0 0 20px -30px",
        padding: "0 0 5px 0"
    };

    const submitButtonStyle = {
        textAlign: "center",
        display: "inline-block",
        width: "150px",
        float: "right"
    };

    const {password, confirmPassword} = this.state;
    return (
        <div>
            <br />
            <div className="container" style={divStyle}>
            <p style={pTextStyle}>Change Password</p>
                <Form>
                    <FormGroup>
                        <Label for="currentPassword">Current Password</Label>
                        <Input style={inputStyle} type="password" name="currentpassword" id="passcurrentpassword" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">New Password</Label>
                        <Input style={inputStyle} type="password" name="password" id="password" onChange={this.validatePassword} value={password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input style={inputStyle} type="password" name="confirmPassword" id="confirmPassword" onChange={this.validatePassword} value={confirmPassword}/>
                    </FormGroup>
                    <Button style={submitButtonStyle} color="primary" onSubmit={this.validatePassword}>Submit</Button>
                </Form>
            </div>
        </div>
    );
}
}

export default ChangePassword;