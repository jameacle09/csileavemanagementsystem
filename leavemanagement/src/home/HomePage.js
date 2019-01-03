import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Dasboard from './Dashboard';

const HomePage = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, CSI Employee!</h1>
        <p className="lead">Welcome to CSI Leave Management System.</p>
        <hr className="my-2" />
        <p>Leave Management System for employees of CSI Interfusion Sdn. Bhd.</p>
        <p className="lead">
          <Button color="primary">Apply Leave</Button>
        </p>
      </Jumbotron>
      <Dasboard />
    </div>
    
  );
};

export default HomePage;