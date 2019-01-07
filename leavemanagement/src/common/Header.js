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

// test
//test2
//test 3
//test4
//test5

export default Header;