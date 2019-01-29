import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import { ACCESS_TOKEN } from '../constants'; 
import { login } from '../util/APIUtils';
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component{
    emptyItem = {
		email: '',
		password: ''
	};

	constructor(props) {
		super(props);
		this.state = { item: this.emptyItem,
						redirectToReferrer: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let item = {...this.state.item};
		item[name] = value;
		this.setState({item});
	}
	
	handleSubmit(event) {
        event.preventDefault();
        
        const values = {
            email : this.state.item.email,
            password : this.state.item.password
        }

		const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
					this.props.onLogin();
					this.setState({ redirectToReferrer: true });
					//this.props.history.push("/");
                }).catch(error => {
					console.log("error: " + error);
                    if(error.status === 401) {
                        alert('Your Username or Password is incorrect. Please try again!');   
                    } else {
                        alert('Sorry! Something went wrong. Please try again!');                                      
                    }
				});
	}

    render() {
		let { from } = this.props.location.state || { from: { pathname: "/" } };
    	let { redirectToReferrer } = this.state;

		if (redirectToReferrer) return <Redirect to={from} />;
		
        return (
            <Container className="Login">
                <Form className="form">
                <Col>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="myemail@chinasofti.com"/>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="********" />
                </FormGroup>
                </Col>
                <Button color="primary">Login</Button>
                </Form>
            </Container>
        );

    }
}

export default Login;