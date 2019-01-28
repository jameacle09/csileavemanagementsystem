import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Styles.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import CSILogo from "../img/CSI_Logo.png";

class SideBar extends Component {
  render() {
    const fontStyle = {
      fontFamily: "Helvetica",
      fontSize: "25px",
      height: "68px",
      width: "250px",
      verticalAlign: "bottom",
      border: "0px solid black"
    };

    return (
      <nav id="sidebar">
        <img src={CSILogo} style={{ margin: "10px 50px 10px 50px" }} />
        {
          // <NavbarBrand href="/" style={fontStyle}>
          //   <Badge color="light">CSI Interfusion Sdn Bhd</Badge>
          // </NavbarBrand>
        }
        <br />
        <h5>CSI Interfusion Sdn. Bhd.</h5>
        <p>Leave Management System</p>
        <ul className="list-unstyled components">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/applyleave">Apply Leave</a>
          </li>
          <li>
            <a href="/myleavehistory">My Leave History</a>
          </li>
          <li>
            <a href="/myleavedetails">My Leave Details</a>
          </li>
          <li>
            <a
              href="#hRSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              HR Dashboard
            </a>
            <ul className="collapse list-unstyled" id="hRSubmenu">
              <li>
                <a href="/liststaffprofile">Staff Profile</a>
              </li>
              <li>
                <a href="/leaveentitlement">Leave Entitlement</a>
              </li>
              <li>
                <a href="/publicholiday">Public Holiday</a>
              </li>
              <li>
                <a href="/leavecategory">Leave Category</a>
              </li>
              <li>
                <a href="#">Reports</a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#mgrSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Manager Dashboard
            </a>
            <ul className="collapse list-unstyled" id="mgrSubmenu">
              <li>
                <a href="/managerapproval">Manager Approval</a>
              </li>
              <li>
                <a href="/staffleavehistory">Leave History</a>
              </li>
              <li>
                <a href="#">Reports</a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#profileSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              My Profile
            </a>
            <ul className="collapse list-unstyled" id="profileSubmenu">
              <li>
                <a href="/myprofile">View Profile</a>
              </li>
              <li>
                <a href="/changepassword">Change Password</a>
              </li>
              <li>
                <a href="#">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
