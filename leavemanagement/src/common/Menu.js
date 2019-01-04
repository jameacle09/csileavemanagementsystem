import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
                <NavLink tag={Link} to="/" activeclassname="active">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/applyleave" activeclassname="active">Apply Leave</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/myleavehistory" activeclassname="active">My Leave History</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/myleavedetails" activeclassname="active">My Leave Details</NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    My Profile
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/myprofile" activeclassname="active">
                      View Profile
                  </DropdownItem>
                    <DropdownItem tag={Link} to="/changepassword" activeclassname="active">
                      Change Password
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menu;
