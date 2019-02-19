import React, { Component } from "react";
import "./stickyfooter.css";
import { Route, Switch, withRouter } from "react-router-dom";
import SideBar from "./common/SideBar";
import Menu from "./common/Menu";
import Footer from "./common/Footer";
import HomePage from "./home/HomePage";
import ApplyLeave from "./leaves/ApplyLeave";
import MyProfile from "./staffprofile/MyProfile";
import MyLeaveDetails from "./leaves/MyLeaveDetails";
import MyLeaveHistory from "./leaves/MyLeaveHistory";
// import ManagerApproval from "./manager/ManagerApproval";
import LeaveRequestsList from "./manager/LeaveRequestsList";
import LeaveRequest from "./manager/LeaveRequest";
import LeaveHistoryList from "./manager/LeaveHistoryList";
import LeaveHistoryView from "./manager/LeaveHistoryView";
import StaffProfileComponent from "./staffprofile/StaffProfileComponent";
import ListStaffProfile from "./staffprofile/ListStaffProfile";
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
import ChangePassword from "./staffprofile/ChangePassword";
import ResetPassword from "./staffprofile/ResetPassword";
import "./common/Styles.css";
import { getCurrentUser } from "./util/APIUtils";
import Login from "./login/Login";
import { ACCESS_TOKEN } from "./constants";
import PrivateRoute from "./common/PrivateRoute";
import Forbidden from "./common/Forbidden";
import NotFound from "./common/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentUser() {
    this.setState({ isLoading: true });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleLogout(redirectTo = "/") {
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
            <SideBar
              isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
              handleLogout={this.handleLogout}
            />
            <div id="content" style={{ width: "100%" }}>
              <Menu
                isAuthenticated={this.state.isAuthenticated}
                currentUser={this.state.currentUser}
              />
              <div className="mainContainerFlex">
                <Switch>
                  {/*<Route exact path="/" title="Home" component={HomePage} />*/}

                  <Route
                    exact
                    path="/"
                    title="Home"
                    render={props => (
                      <HomePage
                        isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        handleLogout={this.handleLogout}
                        {...props}
                      />
                    )}
                  />

                  <PrivateRoute
                    exact
                    authenticated={this.state.isAuthenticated}
                    path="/"
                    component={HomePage}
                    currentUser={this.state.currentUser}
                    handleLogout={this.handleLogout}
                  />
                  <Route
                    path="/login"
                    render={props => (
                      <Login onLogin={this.handleLogin} {...props} />
                    )}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/applyleave"
                    title="Apply Leave"
                    component={ApplyLeave}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/myleavehistory"
                    title="My Leave History"
                    component={MyLeaveHistory}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/myleavedetails"
                    title="My Leave Details"
                    component={MyLeaveDetails}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/myprofile"
                    title="My Profile"
                    component={MyProfile}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/changepassword"
                    title="Change Password"
                    component={ChangePassword}
                  />
                  {/* <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/managerapproval"
                    title="Manager Approval"
                    component={ManagerApproval}
                  /> */}
                  <PrivateRoute
                    exact
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leaverequests"
                    title="Leave Requests List"
                    component={LeaveRequestsList}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leaverequests/view/:emplId/:effDate/:startDate/:leaveCode"
                    title="View Leave Request"
                    component={LeaveRequest}
                  />
                  <PrivateRoute
                    exact
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leavehistory"
                    title="Employee Leave History List"
                    component={LeaveHistoryList}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leavehistory/view/:emplId/:effDate/:startDate/:leaveCode"
                    title="Employee Leave History"
                    component={LeaveHistoryView}
                  />

                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/staffprofile"
                    title="Staff Profile"
                    component={StaffProfileComponent}
                  />
                  <PrivateRoute
                  exact
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/liststaffprofile"
                    title="List Staff Profile"
                    component={ListStaffProfile}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/newstaffprofile"
                    title="New Staff Profile"
                    component={NewStaffProfile}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/liststaffprofile/edit/:emplId"
                    title="Edit Staff Profile"
                    component={EditStaffProfile}
                  />                  
                  <PrivateRoute
                    exact
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leavecategory"
                    title="Leave Category"
                    component={LeaveCategory}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leaveentitlement"
                    title="Leave Entitlement"
                    component={LeaveEntitlement}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/leaveentitlement/edit/:emplId"
                    title="Edit Entitlement"
                    component={EditEntitlement}
                  />
                  <PrivateRoute
                  exact
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/publicholiday"
                    title="Public Holiday"
                    component={PublicHoliday}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/publicholiday/add"
                    title="Add Public Holiday"
                    component={AddPublicHoliday}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/publicholiday/edit/:holidayDate"
                    title="Edit Public Holiday"
                    component={EditPublicHoliday}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/addleavecategory"
                    title="Add Leave Category"
                    component={AddLeaveCategory}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/editleavecategory"
                    title="Edit Leave Category"
                    component={EditLeaveCategory}
                  />
                  <PrivateRoute
                    exact
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/logindetails"
                    title="User Login Details"
                    component={LoginDetails}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/logindetails/add"
                    title="Add User Login Details"
                    component={AddLoginDetails}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/logindetails/edit/:userId"
                    title="Edit User Login Details"
                    component={EditLoginDetails}
                  />
                  <PrivateRoute
                    authenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    path="/resetpassword"
                    title="Reset Password"
                    component={ResetPassword}
                  />
                  <PrivateRoute path="/forbidden" component={Forbidden} />
                  <Route component={NotFound} />
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
