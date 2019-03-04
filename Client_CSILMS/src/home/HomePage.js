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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: ""
      },
      pendingApproval: []
    };

    this.loadUserProfile = this.loadUserProfile.bind(this);
    this.loadPendingApprovalManager = this.loadPendingApprovalManager.bind(
      this
    );
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

  componentDidMount() {
    this.loadUserProfile();
    this.loadPendingApprovalManager();
  }

  render() {
    const divStyle = {
      backgroundImage: `url(${BGURL})`,
      backgroundSize: "cover",
      marginTop: "-16px",
      color: "#FFFFFF"
    };

    let userData = this.state.userData;
    let pendingApproval = this.state.pendingApproval;
    if (pendingApproval == 0) {
      return (
        <div>
          <Jumbotron style={divStyle}>
            <h1 className="display-3">Hello, {userData["name"]}</h1>
            <p className="lead">Welcome to CSI Leave Management System.</p>
            {/* <Countdown /> */}
          </Jumbotron>
          <Dashboard currentUser={this.props.currentUser} />
        </div>
      );
    } else
      return (
        <div>
          <Jumbotron style={divStyle}>
            <h1 className="display-3">Hello, {userData["name"]}</h1>
            <p className="lead">Welcome to CSI Leave Management System.</p>
            <p>
              You have <b style={{ fontSize: "2rem" }}>{pendingApproval}</b>{" "}
              leave request by your staff to be approve.
              <NavLink to="/leaverequests">
                <Button>Click</Button>
              </NavLink>{" "}
              to approve/reject the leave request.
            </p>
            {/* <Countdown /> */}
          </Jumbotron>
          <Dashboard currentUser={this.props.currentUser} />
        </div>
      );
  }
}

export default withRouter(HomePage);
