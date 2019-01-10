import React, { Component } from 'react';
import Menu from './common/Menu';
import Footer from './common/Footer';
import Header from './common/Header';
import HomePage from './home/HomePage';
import ApplyLeave from './leaves/ApplyLeave';
import MyLeaveDetails from './leaves/MyLeaveDetails';
import MyLeaveHistory from './leaves/MyLeaveHistory';
import MyProfile from './staffprofile/MyProfile';
import ChangePassword from './staffprofile/ChangePassword';
import './stickyfooter.css';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import HrDashboard from './hradmin/HrDashboard';
import ManagerApproval from './manager/ManagerApproval';
import ListStaffProfile from './staffprofile/ListStaffProfile';
import NewStaffProfile from './staffprofile/NewStaffProfile';
import PublicHoliday from './hradmin/PublicHoliday';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="Site">
          <div className="Site-content">
            <Menu />
            <Header />
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
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

// test 123

export default App;
