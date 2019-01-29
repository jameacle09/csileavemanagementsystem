import React, { Component } from "react";

import ApplyLeave from "../img/applyleave.png";
import MyLeaveHistory from "../img/myleavehistory.png";
import MyLeaveDetails from "../img/leavedetails.png";
import MyProfile from "../img/myprofile.png";
import ManagerDashboard from "../img/managerapproval.png";
import HRDashboard from "../img/hrdashboard.png";

class Dashboard extends Component {
  render() {
    return (
      <div className="containerDashboard">
        <a href="/applyleave" title="Apply Leave">
          <div className="thumbNail_DashboardMenu">
            <img
              src={ApplyLeave}
              alt="Apply Leave"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">Apply Leave</div>
          </div>
        </a>
        <a href="/myleavehistory" title="View Leave History">
          <div className="thumbNail_DashboardMenu">
            <img
              src={MyLeaveHistory}
              alt="View Leave History"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">My Leave History</div>
          </div>
        </a>
        <a href="/myleavedetails" title="View Leave Details">
          <div className="thumbNail_DashboardMenu">
            <img
              src={MyLeaveDetails}
              alt="View Leave Details"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">My Leave Details</div>
          </div>
        </a>
        <a href="/myprofile" title="View Profile">
          <div className="thumbNail_DashboardMenu">
            <img
              src={MyProfile}
              alt="View Profile"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">My Profile</div>
          </div>
        </a>
        <a href="/managerapproval" title="Manager Dashboard">
          <div className="thumbNail_DashboardMenu">
            <img
              src={ManagerDashboard}
              alt="Manager Dashboard"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">Manager Dashboard</div>
          </div>
        </a>
        <a href="/liststaffprofile" title="HR Dashboard">
          <div className="thumbNail_DashboardMenu">
            <img
              src={HRDashboard}
              alt="HR Dashboard"
              className="thumbNail_DashboardImage"
            />
            <div className="thumbNail_DashboardLabel">HR Dashboard</div>
          </div>
        </a>
      </div>
    );
  }
}

export default Dashboard;
