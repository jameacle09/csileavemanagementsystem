import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Dashboard from './Dashboard';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        'staffName': ''
      }
    };
  }

  componentDidMount() {
    // fetch data from API    
    fetch('http://localhost/api/staffprofile/1')
      .then(response => response.json())
      .then(data => this.setState({ userData: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let userData = {
          'staffName': ''
        }
        this.setState({ userData: userData })
      })
  }
  render() {

    const divStyle = {
      backgroundImage: "url('http://www.chinasofti.com/en/styles/extends/about/images/header.jpg')",
      backgroundSize: "cover",
      marginTop: "-16px",
      color: "#FFFFFF",
      textShadow: "1px 1px #7A7974"
    };

    let userData = this.state.userData;

    return (
      <div>
        <Jumbotron style={divStyle}>
          <h1 className="display-3">Hello, {userData['staffName']}! </h1>
          <p className="lead">Welcome to CSI Leave Management System.</p>
          <hr className="my-2" />
          <p>Leave Management System for employees of CSI Interfusion Sdn. Bhd.</p>
          <p className="lead">
            <Button color="primary">Apply Leave</Button>
          </p>
        </Jumbotron>
        <Dashboard />
      </div>
    );
  }
}

export default HomePage;