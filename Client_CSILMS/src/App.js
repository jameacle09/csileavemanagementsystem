import React, { Component } from "react";
import "./stickyfooter.css";
import { Route, Switch, withRouter } from "react-router-dom";
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
import ListStaffProfile from "./staffprofile/ListStaffProfile";
import NewStaffProfile from "./staffprofile/NewStaffProfile";
import ResetPassword from "./staffprofile/ResetPassword";
import PublicHoliday from "./hradmin/PublicHoliday";
import AddPublicHoliday from "./hradmin/AddPublicHoliday";
import EditPublicHoliday from "./hradmin/EditPublicHoliday";
import LeaveCategory from "./hradmin/LeaveCategory";
import AddLeaveCategory from "./hradmin/AddLeaveCategory";
import EditLeaveCategory from "./hradmin/EditLeaveCategory";
import LeaveEntitlement from "./hradmin/LeaveEntitlement";
import EditEntitlement from "./hradmin/EditEntitlement";
import "./common/Styles.css";
import { getCurrentUser } from './util/APIUtils';
import Login from './login/Login';
import { ACCESS_TOKEN } from './constants';
import PrivateRoute from './common/PrivateRoute';
import Forbidden from './common/Forbidden';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentUser() {
    this.setState({ isLoading: true});
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false,
        });  
      });
  }

  handleLogout(redirectTo="/") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    return (
        <div className="Site">
          <div className="Site-content">
            <div className="wrapper">
              <SideBar isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} 
                    handleLogout={this.handleLogout}/>
              <div id="content" style={{ width: "100%" }}>
                <Menu isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} />
                <div className="mainContainerFlex">
                  <Switch>
                    <PrivateRoute exact authenticated={this.state.isAuthenticated} path="/" 
                      component={HomePage} currentUser={this.state.currentUser} handleLogout={this.handleLogout}></PrivateRoute>
                    <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
                    <PrivateRoute authenticated={this.state.isAuthenticated} path="/applyleave" title="Apply Leave"
                      component={ApplyLeave} currentUser={this.state.currentUser} ></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/myleavehistory" title="My Leave History" component={MyLeaveHistory}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/myleavedetails" title="My Leave Details" component={MyLeaveDetails}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/myprofile" title="My Profile" component={MyProfile}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/changepassword" title="Change Password" component={ChangePassword}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/managerapproval" title="Manager Approval" component={ManagerApproval}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/staffleavehistory" title="Staff Leave History" component={StaffLeaveHistory}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/staffprofile" title="Staff Profile" component={StaffProfileComponent}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/liststaffprofile" title="List Staff Profile" component={ListStaffProfile}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/newstaffprofile" title="New Staff Profile" component={NewStaffProfile}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/publicholiday" title="Public Holiday" component={PublicHoliday}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/leavecategory" title="Leave Category" component={LeaveCategory}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/leaveentitlement" title="Leave Entitlement" component={LeaveEntitlement}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/editentitlement" title="Edit Entitlement" component={EditEntitlement}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/addpublicholiday" title="Add Public Holiday" component={AddPublicHoliday}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/editpublicholiday" title="Edit Public Holiday" component={EditPublicHoliday}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/addleavecategory" title="Add Leave Category" component={AddLeaveCategory}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/editleavecategory" title="Edit Leave Category" component={EditLeaveCategory}></PrivateRoute>
                    <PrivateRoute authenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}
                        path="/resetpassword" title="Reset Password" component={ResetPassword}></PrivateRoute>
                    <PrivateRoute path="/forbidden" component={Forbidden}/>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    );
  }
}

export default withRouter(App);
