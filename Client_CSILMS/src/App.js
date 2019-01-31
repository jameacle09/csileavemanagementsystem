import React, { Component } from "react";
import "./stickyfooter.css";
import { Route, BrowserRouter as Router, Switch, withRouter } from "react-router-dom";
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
        console.log(error);
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
    let menu, sideBar;
    if(this.state.isAuthenticated){
      menu = <Menu />;
      sideBar = <SideBar currentUser={this.state.currentUser} handleLogout={this.handleLogout} />;
    }
     
    return (
      <Router>
        <div className="Site">
          <div className="Site-content">
            <div className="wrapper">
              {sideBar}
              {/*<SideBar />*/}
              <div id="content" style={{ width: "100%" }}>
                {menu}
                {/*<Menu />*/}
                <div className="mainContainerFlex">
                  <Switch>
                    {/*<Route exact path="/" title="Home" component={HomePage} />*/}

                    <Route exact path="/" title="Home" render={(props) => <HomePage isAuthenticated={this.state.isAuthenticated}  
                        currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />} />

                    <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
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
                      title="List Staff Profile"
                      component={StaffProfileComponent}
                    />
                    <Route
                      path="/liststaffprofile"
                      title="List Staff Profile"
                      component={ListStaffProfile}
                    />
                    <Route
                      path="/newstaffprofile"
                      title="New Staff Profile"
                      component={NewStaffProfile}
                    />
                    <Route
                      path="/publicholiday"
                      title="Public Holiday"
                      component={PublicHoliday}
                    />
                    <Route
                      path="/leavecategory"
                      title="Leave Category"
                      component={LeaveCategory}
                    />
                    <Route
                      path="/leaveentitlement"
                      title="Leave Entitlement"
                      component={LeaveEntitlement}
                    />
                    <Route
                      path="/editentitlement"
                      title="Edit Entitlement"
                      component={EditEntitlement}
                    />
                    <Route
                      path="/addpublicholiday"
                      title="Add Public Holiday"
                      component={AddPublicHoliday}
                    />
                    <Route
                      path="/editpublicholiday"
                      title="Edit Public Holiday"
                      component={EditPublicHoliday}
                    />
                    <Route
                      path="/addleavecategory"
                      title="Add Leave Category"
                      component={AddLeaveCategory}
                    />
                    <Route
                      path="/editleavecategory"
                      title="Edit Leave Category"
                      component={EditLeaveCategory}
                    />
                    <Route
                      path="/resetpassword"
                      title="Reset Password"
                      component={ResetPassword}
                    />
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

export default withRouter(App);
