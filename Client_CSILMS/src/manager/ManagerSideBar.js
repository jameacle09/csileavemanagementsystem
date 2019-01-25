import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import "../common/Styles.css";

class ManagerSideBar extends Component {
  render() {
    return (
      <div className="main_sidebar">
        <Nav navbar>
          <NavLink
            to="/managerapproval"
            className="inactive"
            activeClassName="active"
          >
            Manager Approval
          </NavLink>
          <NavLink
            to="/staffleavehistory"
            className="inactive"
            activeClassName="active"
          >
            Leave History
          </NavLink>
          <NavLink to="#" className="inactive" activeClassName="active">
            Report
          </NavLink>
        </Nav>
      </div>
    );
  }
}

export default ManagerSideBar;
