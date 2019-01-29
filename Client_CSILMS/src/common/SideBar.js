import React, { Component } from "react";
import "./Styles.css";
import CSILogo from "../img/CSI_Logo.png";

class SideBar extends Component {
  render() {
    return (
      <nav id="sidebar">
        <img
          src={CSILogo}
          alt="CSI Interfusion Logo"
          style={{ margin: "10px auto 10px 60px" }}
        />

        {
          // <NavbarBrand href="/" style={fontStyle}>
          //   <Badge color="light">CSI Interfusion Sdn Bhd</Badge>
          // </NavbarBrand>
        }
        <br />
        <h5 align="center">CSI Interfusion Sdn. Bhd.</h5>
        <p align="center">Leave Management System</p>
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
                <a href="/">Reports</a>
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
                <a href="/">Reports</a>
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
                <a href="/">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideBar;
