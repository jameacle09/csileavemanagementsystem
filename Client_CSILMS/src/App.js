import React, { Component } from "react";
import "./stickyfooter.css";
import { Route, Switch, withRouter } from "react-router-dom";
// import SideBar from "./common/SideBar";
// import Menu from "./common/Menu";
import PageHeader from "./common/PageHeader";
import PageSideBar from "./common/PageSideBar";
import PageFooter from "./common/PageFooter";
import HomePage from "./home/HomePage";
import ApplyLeave from "./leaves/ApplyLeave";
import MyProfile from "./staffprofile/MyProfile";
import MyLeaveDetails from "./leaves/MyLeaveDetails";
import MyLeaveHistory from "./leaves/MyLeaveHistory";
import MyLeaveHistoryView from "./leaves/MyLeaveHistoryView";
import MyPublicHoliday from "./leaves/MyPublicHoliday";
import MyPublicHolidayView from "./leaves/MyPublicHolidayView";
import LeaveRequestsList from "./manager/LeaveRequestsList";
import LeaveRequest from "./manager/LeaveRequest";
import LeaveHistoryList from "./manager/LeaveHistoryList";
import LeaveHistoryView from "./manager/LeaveHistoryView";
// import StaffProfileComponent from "./staffprofile/StaffProfileComponent";
import ListStaffProfile from "./staffprofile/ListStaffProfile";
import NewStaffProfile from "./staffprofile/NewStaffProfile";
// import EditStaffProfile from "./staffprofile/EditStaffProfile";
import UploadEmployeeProfile from "./staffprofile/UploadStaffProfile";
import MultipleStaffUpdate from "./staffprofile/MultipleStaffUpdate";
import LeaveHistoryHR from "./hradmin/LeaveHistoryHR";
import LeaveHistoryViewHR from "./hradmin/LeaveHistoryViewHR";
import PublicHoliday from "./hradmin/PublicHoliday";
import AddPublicHoliday from "./hradmin/AddPublicHoliday";
import EditPublicHoliday from "./hradmin/EditPublicHoliday";
import UploadHoliday from "./hradmin/UploadHoliday";
import LeaveCategory from "./hradmin/LeaveCategory";
import AddLeaveCategory from "./hradmin/AddLeaveCategory";
import EditLeaveCategory from "./hradmin/EditLeaveCategory";
import TranslateItems from "./hradmin/TranslateItems";
import AddTranslateItem from "./hradmin/AddTranslateItem";
import EditTranslateItem from "./hradmin/EditTranslateItem";
import LeaveEntitlement from "./hradmin/LeaveEntitlement";
import LeaveEntitlementManager from "./manager/LeaveEntitlementManager";
import AddEntitlement from "./hradmin/AddEntitlement";
import EditEntitlement from "./hradmin/EditEntitlement";
import UploadEntitlement from "./hradmin/UploadEntitlement";
import LoginDetails from "./hradmin/LoginDetails";
import AddLoginDetails from "./hradmin/AddLoginDetails";
import EditLoginDetails from "./hradmin/EditLoginDetails";
import ChangePassword from "./staffprofile/ChangePassword";
import ResetPassword from "./staffprofile/ResetPassword";
import "./common/Styles.css";
import { getCurrentUser, isFirstTimeLogin } from "./util/APIUtils";
import Login from "./login/Login";
import { ACCESS_TOKEN, FIRST_TIME } from "./constants";
import PrivateRoute from "./common/PrivateRoute";
import Forbidden from "./common/Forbidden";
import NotFound from "./common/NotFound";
import FirstTime from "./common/FirstTime";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.checkFirstTimeLogin = this.checkFirstTimeLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.checkFirstTimeLogin();
  }

  loadCurrentUser() {
    this.setState({ isLoading: true });
    getCurrentUser()
      .then(response => {
        this.setState(
          {
            currentUser: response,
            isAuthenticated: true,
            isLoading: false
          },
          () => {
            this.createOrRemoveSideBarSpace();
          }
        );
      })
      .catch(error => {
        this.setState(
          {
            isLoading: false
          },
          () => {
            this.createOrRemoveSideBarSpace();
          }
        );
      });
  }

  checkFirstTimeLogin() {
    isFirstTimeLogin().then(response => {
      if (response.message === "YES") {
        localStorage.setItem(FIRST_TIME, response.message);
        this.props.history.push("/firsttime");
      }
    });
  }

  handleLogin() {
    this.loadCurrentUser();
    this.checkFirstTimeLogin();
    this.props.history.push("/");
  }

  handleLogout(redirectTo = "/") {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.removeSideBarSpace();
    this.props.history.push(redirectTo);
  }

  createOrRemoveSideBarSpace = () => {
    if (this.state.currentUser) {
      if (window.screen.width <= 768) {
        this.removeSideBarSpace();
      } else {
        this.createSideBarSpace();
      }
    } else {
      this.removeSideBarSpace();
    }
  };

  createSideBarSpace = () => {
    document.getElementById("MainPage").style.width = "83.5%";
    document.getElementById("MainPage").style.marginLeft = "250px";
    document.getElementById("MainPage").style.transitionDuration = "0s";
  };

  removeSideBarSpace = () => {
    document.getElementById("MainPage").style.width = "100%";
    document.getElementById("MainPage").style.marginLeft = "0";
    document.getElementById("MainPage").style.transitionDuration = "0s";
  };

  render() {
    let showPageFooter = "";
    if (this.state.currentUser) {
      showPageFooter = <PageFooter />;
    }

    return (
      <div className="Site">
        <div id="MainPage" className="wrapper">
          <PageSideBar
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            handleLogout={this.handleLogout}
          />
          <div id="content" style={{ width: "100%" }}>
            <PageHeader
              isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
            />
            <div className="mainContainerFlex">
              <Switch>
                <PrivateRoute
                  exact
                  authenticated={this.state.isAuthenticated}
                  path="/"
                  title="Home"
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
                  exact
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/myleavehistory"
                  title="My Leave History"
                  component={MyLeaveHistory}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/myleavehistory/view/:emplId/:effDate/:startDate/:leaveCode"
                  title="My Leave History View"
                  component={MyLeaveHistoryView}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/myleavedetails"
                  title="My Leave Details"
                  component={MyLeaveDetails}
                />
                <PrivateRoute
                  exact
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/mypublicholiday"
                  title="My Public Holiday"
                  component={MyPublicHoliday}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/mypublicholiday/view/:holidayDate"
                  title="View Public Holiday"
                  component={MyPublicHolidayView}
                />

                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/myprofile"
                  title="My Profile"
                  component={MyProfile}
                />
                <Route
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/changepassword"
                  title="Change Password"
                  component={ChangePassword}
                />

                {/* Leave Requests */}
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

                {/* Leave History */}
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

                {/* Employee Profiles */}
                {/* <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/staffprofile"
                  title="Employee Profiles"
                  component={StaffProfileComponent}
                /> */}
                <PrivateRoute
                  exact
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/liststaffprofile"
                  title="Employee Profile List"
                  component={ListStaffProfile}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/liststaffprofile/add"
                  title="Add Employee Profile"
                  component={NewStaffProfile}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/liststaffprofile/edit/:emplId"
                  title="Edit Employee Profile"
                  component={NewStaffProfile}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/liststaffprofile/uploadprofiles"
                  title="Upload Employee Profile"
                  component={UploadEmployeeProfile}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/liststaffprofile/multipleupdate"
                  title="Update Multiple Employees"
                  component={MultipleStaffUpdate}
                />

                {/* Applied Leave of all Employees*/}
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/listallappliedleave"
                  title="Employee Leave History"
                  component={LeaveHistoryHR}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leavehistoryhr/view/:emplId/:effDate/:startDate/:leaveCode"
                  title="Employee Leave History"
                  component={LeaveHistoryViewHR}
                />

                {/* Leave Entitlements */}
                <PrivateRoute
                  exact
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leaveentitlement"
                  title="Leave Entitlement"
                  component={LeaveEntitlement}
                />
                {/* Leave Entitlements for Employees under direct report only */}
               <PrivateRoute
                  exact
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leaveentitlementmanager"
                  title="Employee Leave Entitlement"
                  component={LeaveEntitlementManager}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leaveentitlement/add"
                  title="Add Entitlement"
                  component={AddEntitlement}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leaveentitlement/edit/:emplId/:year/:leaveCode"
                  title="Edit Entitlement"
                  component={EditEntitlement}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leaveentitlement/uploadentitlement"
                  title="Upload Entitlement"
                  component={UploadEntitlement}
                />

                {/* Public Holidays */}
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
                  path="/publicholiday/uploadholiday"
                  title="Upload Public Holiday"
                  component={UploadHoliday}
                />

                {/* Leave Categories */}
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
                  path="/leavecategory/add"
                  title="Add Leave Category"
                  component={AddLeaveCategory}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/leavecategory/edit/:leaveCode"
                  title="Edit Leave Category"
                  component={EditLeaveCategory}
                />

                {/* Translate Items */}
                <PrivateRoute
                  exact
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/translateitems"
                  title="Translate Items"
                  component={TranslateItems}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/translateitems/add"
                  title="Add Translate Item"
                  component={AddTranslateItem}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/translateitems/edit/:fieldname/:fieldvalue"
                  title="Edit Translate Item"
                  component={EditTranslateItem}
                />

                {/* Login Details */}
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

                {/* Reset Password */}
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  path="/resetpassword"
                  title="Reset Password"
                  component={ResetPassword}
                />
                <PrivateRoute path="/forbidden" component={Forbidden} />
                <Route path="/firsttime" component={FirstTime} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
          {showPageFooter}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
