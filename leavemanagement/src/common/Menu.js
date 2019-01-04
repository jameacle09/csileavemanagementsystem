import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';
import {
  Link
} from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <div>
          <Navbar className="navbar navbar-dark bg-primary" expand="md">
            <NavbarBrand href="/"><Badge color="light">CSI Interfusion Sdn. Bhd.</Badge><span> | </span>Leave Management System</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/" activeClassName="active">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/applyleave" activeClassName="active">Apply Leave</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/myleavehistory" activeClassName="active">My Leave History</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/myleavedetails" activeClassName="active">My Leave Details</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/myprofile" activeClassName="active">My Profile</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          
        </div>
    );
  }
}

export default Menu;
