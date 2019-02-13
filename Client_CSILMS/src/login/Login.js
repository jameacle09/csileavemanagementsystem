import React, { Component } from 'react';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
import { ACCESS_TOKEN } from '../constants'; 
import { login } from '../util/APIUtils';
import "./Login.css";
import { FormErrors } from './LoginError';
import { withRouter } from 'react-router-dom';

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = { 
            email : '',
            password : '',
            formErrors: {email: '', password: '', loginfailed: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    
    handleUserInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name, value) });
    }
	
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : 'E-mail is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
    }
    
    submitForm(e) {
        e.preventDefault();
        const values = {
            email : this.state.email,
            password : this.state.password
        }

		const loginRequest = Object.assign({}, values);
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
			this.props.onLogin();
        }).catch(error => {
            let fieldValidationErrors = this.state.formErrors;
            if(error.status === 401) {
                fieldValidationErrors.loginfailed = 'Your Username or Password is incorrect. Please try again!';
                this.setState({formErrors: fieldValidationErrors}); 
            } else {
                fieldValidationErrors.loginfailed = 'Sorry! Something went wrong. Please try again!';                                     
            }
		});
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
    
    render() {
        const { email, password } = this.state;

        return (
            <center>
            <div className="Login">
                <h2>Sign In</h2>
                <div>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <Form className="form" onSubmit={this.submitForm}>
                <Col>
                <FormGroup>
                    <Label>E-mail</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="myemail@email.com"
                        value={ email }
                        onChange={this.handleUserInput}
                    />
                </FormGroup>
          </Col>
          <Col>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="********"
                        value={ password }
                        onChange={this.handleUserInput}
                    />
                </FormGroup>
          </Col>
          <Button >Submit</Button>
      </Form>
      </div>
      </center>
    );

    }
}

export default withRouter(Login);