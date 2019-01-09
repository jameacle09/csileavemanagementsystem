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
  
export default Header;