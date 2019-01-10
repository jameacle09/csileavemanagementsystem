import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Dashboard from './Dashboard';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const divStyle = {
      backgroundImage: "url('http://www.chinasofti.com/en/styles/extends/about/images/header.jpg')",
      backgroundSize: "cover",
      marginTop: "-16px",
      color: "#A9A9A9",
      textShadow: "2px"
  };
    return (
      <div>
        <Jumbotron style= { divStyle }>
          <h1 className="display-3">Hello, CSI Employee!</h1>
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