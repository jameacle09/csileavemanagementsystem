import React, { Component } from 'react';
import './stickyfooter.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Menu from './common/Menu';
import Footer from './common/Footer';
import HomePage from './home/HomePage';
import ApplyLeave from './leaves/ApplyLeave';
import MyLeaveDetails from './leaves/MyLeaveDetails';
import MyLeaveHistory from './leaves/MyLeaveHistory';
import LeaveEntitlement from './leaves/LeaveEntitlement';
import AddNewLeave from './leaves/AddNewLeave';
import MyProfile from './staffprofile/MyProfile';
import ChangePassword from './staffprofile/ChangePassword';
import ListStaffProfile from './staffprofile/ListStaffProfile';
import NewStaffProfile from './staffprofile/NewStaffProfile';
import ManagerApproval from './manager/ManagerApproval';
import HrDashboard from './hradmin/HrDashboard';
import PublicHoliday from './hradmin/PublicHoliday';
import LeaveCategory from './hradmin/LeaveCategory';
import AddPublicHoliday from './hradmin/AddPublicHoliday';
import AddLeaveCategory from './hradmin/AddLeaveCategory';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="Site">
          <div className="Site-content">
            <Menu />
            <Switch>
              <Route exact path="/" title="Home" component={HomePage} />
              <Route path="/applyleave" title="Apply Leave" component={ApplyLeave} />
              <Route path="/myleavehistory" title="My Leave History" component={MyLeaveHistory} />
              <Route path="/myleavedetails" title="My Leave Details" component={MyLeaveDetails} />
              <Route path="/myprofile" title="My Profile" component={MyProfile} />
              <Route path="/changepassword" title="Change Password" component={ChangePassword} />
              <Route path="/managerapproval" title="Manager Approval" component={ManagerApproval} />
              <Route path="/hrdashboard" title="HR Dashboard" component={HrDashboard} />
              <Route path="/liststaffprofile" title="List Staff Profile" component={ListStaffProfile} />
              <Route path="/newstaffprofile" title="New Staff Profile" component={NewStaffProfile} />
              <Route path="/publicholiday" title="Public Holiday" component={PublicHoliday} />
              <Route path="/leavecategory" title="Leave Category" component={LeaveCategory} />
              <Route path="/leaveentitlement" title="Leave Entitlement" component={LeaveEntitlement} />
              <Route path="/addnewleave" title="Add New Leave" component={AddNewLeave} />
              <Route path="/addpublicholiday" title="Add Public Holiday" component={AddPublicHoliday} />
              <Route path="/AddLeaveCategory" title="Add Leave Category" component={AddLeaveCategory} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
