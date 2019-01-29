import React, { Component } from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Styles.css";
import CSILogo from "../img/CSI_Logo.png";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = (e) => {
    e.preventDefault();
    alert('The link was clicked.');

    this.props.handleLogout('/login');
  }

  render() {
    const menuStyle = {
      fontSize: "1rem",
      background: "#004A9B",
      fontFamily: "Helvetica",
      margin: "0 0 0 0",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      align: "left",
      padding: "5px",
      border: "2px solid black"
    };
    const menuStyle2 = {
      fontSize: "1rem",
      background: "#004A9B",
      fontFamily: "Helvetica",
      margin: "0 0 0 0",
      padding: "0",
      width: "100%"
    };
    const menuStyle3 = {
      fontSize: "1rem",
      background: "#004A9B",
      fontFamily: "Helvetica",
      margin: "0 0 0 0",
      padding: "0",
      height: "66px"
    };
    const fontStyle = {
      fontFamily: "Helvetica",
      fontSize: "20px",
      padding: "10px",
      color: "white"
    };
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={menuStyle2}
      >
        <div className="container-fluid" style={menuStyle2}>
          <button type="button" id="sidebarCollapse" className="btn btn-info">
            <i className="fas fa-align-left" />
            <span>Toggle Sidebar</span>
          </button>
          <button
            className="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-align-justify" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <span style={fontStyle}>Leave Management System</span>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <a className="menu_a" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="menu_a" href="/applyleave">
                  Apply Leave
                </a>
              </li>
              <li className="nav-item">
                <a className="menu_a" href="/myleavehistory">
                  My Leave History
                </a>
              </li>
              <li className="nav-item">
                <a className="menu_a" href="/myleavedetails">
                  My Leave Details
                </a>
              </li>
              <li className="nav-item">
                <a className="menu_a" href="/myprofile">
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="menu_a" href="#" onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
