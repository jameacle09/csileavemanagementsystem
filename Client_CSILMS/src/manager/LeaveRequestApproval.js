import React, { Component } from "react";
import LeaveRequestList from "./LeaveRequestList";
import LeaveRequest from "./LeaveRequest";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, getCurrentUser, isManagerRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";

class LeaveRequestApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveRequestData: [],
      componentFlag: "doList",
      componentToLoad: <LeaveRequestList />
    };
    this.showLeaveRequest = this.showLeaveRequest.bind(this);
    this.showLeaveRequestList = this.showLeaveRequestList.bind(this);
  }

  componentDidMount() {
    this.showLeaveRequestList();
  }

  showLeaveRequestList() {
    // getCurrentUser()
    //   .then(currentUser => {
    //     // console.log(currentUser);
    //     this.setState({ currentApproverId: currentUser.emplId });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // // this.setState({ currentApproverId: currentApproverId });
    //url: API_BASE_URL + "/appliedleave/E000000011/pendingapproval",

    fetchData({
      url: API_BASE_URL + "/appliedleave/me/pendingapproval",
      method: "GET"
    })
      .then(data => {
        this.setState({
          leaveRequestData: data,
          componentFlag: "doList"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showLeaveRequest() {
    this.setState({ componentFlag: "doView" });
  }

  render() {
    // if (!isManagerRole(this.props.currentUser)) {
    //   return <Redirect to="/forbidden" />;
    // }

    switch (this.state.componentFlag) {
      case "doView":
        this.state.componentToLoad = (
          <LeaveRequest
            data={this.state.data}
            showLeaveRequest={this.showLeaveRequest}
          />
        );
        break;
      default:
        this.state.componentToLoad = (
          <LeaveRequestList
            data={this.state.leaveRequestData}
            showLeaveRequestList={this.showLeaveRequestList}
          />
        );
    }
    return <div>{this.state.componentToLoad}</div>;
  }
}

export default LeaveRequestApproval;
