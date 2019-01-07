import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


class Header extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><h1>Home</h1></BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }
} 

//chaikp: testing git push and pull
//chaikp: testing visual studio code source control commit

export default Header;