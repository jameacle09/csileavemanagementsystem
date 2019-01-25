import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import "../common/Styles.css";

class SideBar extends Component {
  render() {
    return (
      <div className="main_sidebar">
        <Nav navbar>
          <NavLink
            to="/liststaffprofile"
            className="inactive"
            activeClassName="active"
          >
            Staff Profile
          </NavLink>
          <NavLink
            to="/leaveentitlement"
            className="inactive"
            activeClassName="active"
          >
            Leave Entitlement
          </NavLink>
          <NavLink
            to="/publicholiday"
            className="inactive"
            activeClassName="active"
          >
            Public Holiday
          </NavLink>
          <NavLink
            to="/leavecategory"
            className="inactive"
            activeClassName="active"
          >
            Leave Category
          </NavLink>
          <NavLink to="#" className="inactive" activeClassName="active">
            Report
          </NavLink>
        </Nav>
      </div>
    );
  }
}

export default SideBar;
