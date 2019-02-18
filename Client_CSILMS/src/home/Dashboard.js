import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApplyLeave from "../img/applyleave.png";
import MyLeaveHistory from "../img/myleavehistory.png";
import MyLeaveDetails from "../img/leavedetails.png";
import MyProfile from "../img/myprofile.png";
import ManagerApproval from "../img/managerapproval.png";
import HRDashboard from "../img/hrdashboard.png";
import { displayByRole } from "../util/APIUtils";

class Dashboard extends Component {
  render() {
    return (
      <div className="containerDashboard">
        <NavLink
          to="/applyleave"
          title="Apply Leave"
          activeClassName="sidebarLinkActive"
        >
          <div className="thumbNail_DashboardMenu">
            <img
              src={ApplyLeave}
              alt="Apply Leave"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">Apply Leave</div>
          </div>
        </NavLink>
        <NavLink
          to="/myleavehistory"
          title="View Leave History"
          activeClassName="sidebarLinkActive"
        >
          <div className="thumbNail_DashboardMenu">
            <img
              src={MyLeaveHistory}
              alt="View Leave History"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">My Leave History</div>
          </div>
        </NavLink>
        <NavLink
          to="/myleavedetails"
          title="View Leave Details"
          activeClassName="sidebarLinkActive"
        >
          <div className="thumbNail_DashboardMenu">
            <img
              src={MyLeaveDetails}
              alt="View Leave Details"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">My Leave Details</div>
          </div>
        </NavLink>
        <NavLink
          to="/myprofile"
          title="View Profile"
          activeClassName="sidebarLinkActive"
        >
          <div className="thumbNail_DashboardMenu">
            <img
              src={MyProfile}
              alt="View Profile"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">My Profile</div>
          </div>
        </NavLink>
        <NavLink
          to="/leaverequests"
          title="Manager Approval"
          activeClassName="sidebarLinkActive"
          style={displayByRole(this.props.currentUser, "MANAGER")}
        >
          <div className="thumbNail_DashboardMenu">
            <img
              src={ManagerApproval}
              alt="Manager Approval"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">Manager Approval</div>
          </div>
        </NavLink>
        <NavLink
          to="/liststaffprofile"
          title="HR Dashboard"
          activeClassName="sidebarLinkActive"
          style={displayByRole(this.props.currentUser, "HR")}
        >
          <div className="thumbNail_DashboardMenu">
            <img
              src={HRDashboard}
              alt="HR Dashboard"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">HR Dashboard</div>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Dashboard;
