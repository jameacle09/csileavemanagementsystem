import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { displayByRole } from "../util/APIUtils";
import "./SideBarHeader.css";
import CSILogo from "../img/CSI_Logo.png";

class PageSideBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = e => {
    e.preventDefault();
    this.props.handleLogout("/login");
  };

  render() {
    if (!this.props.currentUser) {
      return <div />;
    }

    return (
      <div id="PageSidebar" className="sidebar" width="250px">
        <Link to="/" title="Home">
          <img
            src={CSILogo}
            alt="CSI Interfusion Logo"
            style={{ margin: "10px auto 10px 60px" }}
          />
        </Link>
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
            <NavLink to="/" exact activeClassName="sidebarLinkActive">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/applyleave" activeClassName="sidebarLinkActive">
              Apply Leave
            </NavLink>
          </li>
          <li>
            <NavLink to="/myleavehistory" activeClassName="sidebarLinkActive">
              My Leave History
            </NavLink>
          </li>
          <li>
            <NavLink to="/myleavedetails" activeClassName="sidebarLinkActive">
              My Leave Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypublicholiday" activeClassName="sidebarLinkActive">
              My Public Holidays
            </NavLink>
          </li>
          <li style={displayByRole(this.props.currentUser, "HR")}>
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
                <NavLink
                  to="/liststaffprofile"
                  activeClassName="sidebarLinkActive"
                >
                  Employee Profiles
                </NavLink>
              </li>
              <li>
                <NavLink to="/logindetails" activeClassName="sidebarLinkActive">
                  User Login Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/listallappliedleave"
                  activeClassName="sidebarLinkActive"
                >
                  Employee Leave History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/leaveentitlement"
                  activeClassName="sidebarLinkActive"
                >
                  Leave Entitlements
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/publicholiday"
                  activeClassName="sidebarLinkActive"
                >
                  Public Holidays
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/leavecategory"
                  activeClassName="sidebarLinkActive"
                >
                  Leave Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/translateitems"
                  activeClassName="sidebarLinkActive"
                >
                  Translate Items
                </NavLink>
              </li>
            </ul>
          </li>
          <li style={displayByRole(this.props.currentUser, "MANAGER")}>
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
                <NavLink
                  to="/leaverequests"
                  activeClassName="sidebarLinkActive"
                >
                  Leave Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/leavehistory" activeClassName="sidebarLinkActive">
                  Leave History
                </NavLink>
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
                <NavLink to="/myprofile" activeClassName="sidebarLinkActive">
                  View Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/changepassword"
                  activeClassName="sidebarLinkActive"
                >
                  Change Password
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  activeClassName="sidebarLinkActive"
                  onClick={this.handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default PageSideBar;
