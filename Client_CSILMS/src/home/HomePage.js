import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import Dashboard from "./Dashboard";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { withRouter } from "react-router-dom";
// import { Hidden } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import BGURL from "../img/header.jpg";
// import Countdown from "../common/Countdown.js"
import LoadingPage from "../common/LoadingPage";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: ""
      },
      pendingApproval: [],
      staffLeave: {
        balanceLeave: ""
      },
      loading: true
    };
    this.loadUserProfile = this.loadUserProfile.bind(this);
    this.loadPendingApprovalManager = this.loadPendingApprovalManager.bind(
      this
    );
    this.loadLeaveBalance = this.loadLeaveBalance.bind(this);
  }

  loadUserProfile() {
    fetchData({
      url: API_BASE_URL + "/persondetail/me",
      method: "GET"
    })
      .then(response => {
        this.setState({
          userData: response
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  loadPendingApprovalManager() {
    fetchData({
      url: API_BASE_URL + "/appliedleave/count/me/pendingapproval",
      method: "GET"
    })
      .then(response => {
        this.setState({
          pendingApproval: response
        });
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  loadLeaveBalance() {
    // fetch leave balance from API
    const thisYear = new Date().getFullYear();
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me/" + thisYear + "/AL",
      method: "GET"
    })
      .then(data => this.setState({ staffLeave: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let staffLeaveData = {
          balanceLeave: ""
        };
        this.setState({ staffLeave: staffLeaveData });
      });
  }

  componentDidMount() {
    this.loadUserProfile();
    this.loadPendingApprovalManager();
    this.loadLeaveBalance();
    this.setState({
      loading: false
    });
  }

  render() {
    const divStyle = {
      backgroundImage: `url(${BGURL})`,
      backgroundSize: "cover",
      marginTop: "-16px",
      color: "#FFFFFF"
    };
    const pstyle = {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backgroundSize: "cover",
      borderRadius: "20px",
      padding: "10px"
    };

    let { staffLeave, userData, pendingApproval, loading } = this.state;

    // let userData = this.state.userData;
    // let pendingApproval = this.state.pendingApproval;
    if (loading) {
      return (
        <div className="mainContainerFlex">
          <LoadingPage />
        </div>
      );
    }
    if (pendingApproval === 0) {
      return (
        <div>
          <Jumbotron style={divStyle}>
            <div style={pstyle}>
              <h1 className="display-3">Hello, {userData["name"]}</h1>
              <h1 className="lead">Welcome to CSI Leave Management System.</h1>
              <h1 className="lead">
                You have{" "}
                <b style={{ fontSize: "2rem" }}>{staffLeave["balanceLeave"]}</b>{" "}
                days remaining leave balance to go.
              </h1>
            </div>
          </Jumbotron>
          <Dashboard currentUser={this.props.currentUser} />
        </div>
      );
    } else
      return (
        <div>
          <Jumbotron style={divStyle}>
            <div style={pstyle}>
              <h1 className="display-3">Hello, {userData["name"]}</h1>
              <h2 className="lead">Welcome to CSI Leave Management System.</h2>
              <h2 className="lead">
                You have <b style={{ fontSize: "2rem" }}>{pendingApproval}</b>{" "}
                leave request by your staff to be approve.
                <NavLink to="/leaverequests">
                  <Button>Click</Button>
                </NavLink>{" "}
                to approve/reject the leave request.
              </h2>
              <h2 className="lead">
                You have{" "}
                <b style={{ fontSize: "2rem" }}>{staffLeave["balanceLeave"]}</b>{" "}
                days remaining leave balance to go.
              </h2>
            </div>
          </Jumbotron>
          <Dashboard currentUser={this.props.currentUser} />
        </div>
      );
  }
}

export default withRouter(HomePage);
