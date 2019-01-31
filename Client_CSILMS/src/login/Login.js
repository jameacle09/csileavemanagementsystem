import React, { Component } from 'react';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
import { ACCESS_TOKEN } from '../constants'; 
import { login } from '../util/APIUtils';
import { Redirect } from "react-router-dom";
import "./Login.css";
import { FormErrors } from './LoginError';

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = { 
            redirectToReferrer: false,
            email : '',
            password : '',
            formErrors: {email: '', password: '', loginfailed: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };

		//this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
    }
	
	handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
        [ name ]: value,
        });
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
            this.setState({ redirectToReferrer: true,
                                    errorState:true
            });
					//this.props.history.push("/");
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
    
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render() {
		let { from } = this.props.location.state || { from: { pathname: "/" } };
    	let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;
        
        const { email, password } = this.state;

        return (
            <center>
            <div className="Login">
                <h2>Sign In</h2>
                <div>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
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
          <Button>Submit</Button>
      </Form>
      </div>
      </center>
        );

    }
}

export default Login;