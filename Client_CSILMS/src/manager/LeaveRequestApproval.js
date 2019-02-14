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
      data: [],
      currentApproverId: "",
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
    //     let currentEmplId = currentUser.emplId;
    //     this.setState({ currentApproverId: currentEmplId });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.setState({ currentApproverId: currentApproverId });
    //url: API_BASE_URL + "/appliedleave/E000000011/pendingapproval",

    console.log(this.props);
    fetchData({
      url:
        API_BASE_URL +
        `/appliedleave/${this.state.currentApproverId}/pendingapproval`,
      method: "GET"
    })
      .then(data => {
        console.log(data);
        this.setState({ data: data });
        this.setState({ componentFlag: "doList" });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.props.currentUser);
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
            data={this.state.data}
            showLeaveRequestList={this.showLeaveRequestList}
          />
        );
    }
    return <div>{this.state.componentToLoad}</div>;
  }
}

export default LeaveRequestApproval;
