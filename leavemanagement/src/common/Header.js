import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Header = (props) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default Header;