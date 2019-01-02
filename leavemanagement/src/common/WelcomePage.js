import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

const WelcomePage = (props) => {
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
    </div>
  );
};

export default WelcomePage;