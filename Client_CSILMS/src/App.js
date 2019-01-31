import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import SideBar from "./common/SideBar";
import Menu from "./common/Menu";
import Footer from "./common/Footer";
import HomePage from "./home/HomePage";
import ApplyLeave from "./leaves/ApplyLeave";
import MyLeaveDetails from "./leaves/MyLeaveDetails";
import MyLeaveHistory from "./leaves/MyLeaveHistory";
import ManagerApproval from "./manager/ManagerApproval";
import StaffLeaveHistory from "./manager/StaffLeaveHistory";
import MyProfile from "./staffprofile/MyProfile";
import ChangePassword from "./staffprofile/ChangePassword";
import StaffProfileComponent from "./staffprofile/StaffProfileComponent";
// import ListStaffProfile from "./staffprofile/ListStaffProfile";
import NewStaffProfile from "./staffprofile/NewStaffProfile";
import EditStaffProfile from "./staffprofile/EditStaffProfile";
import PublicHoliday from "./hradmin/PublicHoliday";
import AddPublicHoliday from "./hradmin/AddPublicHoliday";
import EditPublicHoliday from "./hradmin/EditPublicHoliday";
import LeaveCategory from "./hradmin/LeaveCategory";
import AddLeaveCategory from "./hradmin/AddLeaveCategory";
import EditLeaveCategory from "./hradmin/EditLeaveCategory";
import LeaveEntitlement from "./hradmin/LeaveEntitlement";
import EditEntitlement from "./hradmin/EditEntitlement";
import LoginDetails from "./hradmin/LoginDetails";
import AddLoginDetails from "./hradmin/AddLoginDetails";
import EditLoginDetails from "./hradmin/EditLoginDetails";
import "./common/Styles.css";
import "./stickyfooter.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="Site">
          <div className="Site-content">
            <div className="wrapper">
              <SideBar />
              <div id="content" style={{ width: "100%" }}>
                <Menu />
                <div className="mainContainerFlex">
                  <Switch>
                    <Route path="/" exact title="Home" component={HomePage} />
                    <Route
                      path="/applyleave"
                      title="Apply Leave"
                      component={ApplyLeave}
                    />
                    <Route
                      path="/myleavehistory"
                      title="My Leave History"
                      component={MyLeaveHistory}
                    />
                    <Route
                      path="/myleavedetails"
                      title="My Leave Details"
                      component={MyLeaveDetails}
                    />
                    <Route
                      path="/myprofile"
                      title="My Profile"
                      component={MyProfile}
                    />
                    <Route
                      path="/changepassword"
                      title="Change Password"
                      component={ChangePassword}
                    />
                    <Route
                      path="/managerapproval"
                      title="Manager Approval"
                      component={ManagerApproval}
                    />
                    <Route
                      path="/staffleavehistory"
                      title="Staff Leave History"
                      component={StaffLeaveHistory}
                    />
                    <Route
                      path="/liststaffprofile"
                      exact
                      title="List Staff Profile"
                      component={StaffProfileComponent}
                    />
                    {/* <Route
                      path="/liststaffprofile"
                      title="List Staff Profile"
                      component={ListStaffProfile}
                    /> */}
                    <Route
                      path="/liststaffprofile/add"
                      title="New Staff Profile"
                      component={NewStaffProfile}
                    />
                    <Route
                      path="/liststaffprofile/edit/:emplId"
                      title="Edit Staff Profile"
                      component={EditStaffProfile}
                    />
                    <Route
                      path="/publicholiday"
                      exact
                      title="Public Holiday"
                      component={PublicHoliday}
                    />
                    <Route
                      path="/leavecategory"
                      exact
                      title="Leave Category"
                      component={LeaveCategory}
                    />
                    <Route
                      path="/leaveentitlement"
                      exact
                      title="Leave Entitlement"
                      component={LeaveEntitlement}
                    />
                    <Route
                      path="/leaveentitlement/edit/:emplId"
                      title="Edit Entitlement"
                      component={EditEntitlement}
                    />
                    <Route
                      path="/publicholiday/add"
                      title="Add Public Holiday"
                      component={AddPublicHoliday}
                    />
                    <Route
                      path="/publicholiday/edit/:holidayId"
                      title="Edit Public Holiday"
                      component={EditPublicHoliday}
                    />
                    <Route
                      path="/leavecategory/add"
                      title="Add Leave Category"
                      component={AddLeaveCategory}
                    />
                    <Route
                      path="/leavecategory/edit/:categoryId"
                      title="Edit Leave Category"
                      component={EditLeaveCategory}
                    />
                    <Route
                      path="/logindetails"
                      exact
                      title="Staff Login Details"
                      component={LoginDetails}
                    />
                    <Route
                      path="/logindetails/add"
                      title="Add Employee Login Details"
                      component={AddLoginDetails}
                    />
                    <Route
                      path="/logindetails/edit/:userId"
                      title="Edit Employee Login Details"
                      component={EditLoginDetails}
                    />
                    <Redirect to="/" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
