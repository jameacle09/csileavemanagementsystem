import React, { Component } from "react";
import { Table } from "reactstrap";
// import ManagerSideBar from "./ManagerSideBar";
import "../common/Styles.css";
import { Redirect, withRouter } from "react-router-dom";
import { isManagerRole } from "../util/APIUtils";
import { fetchData } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import Moment from "react-moment";
// import 'moment-timezone';

class StaffLeaveHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaveRequest: []
    };
  }
  loadHistoryData() {
    // fetch leave request from API
    const thisYear = new Date().getFullYear();
    fetchData({
      url: API_BASE_URL + "/appliedleave/me/" + thisYear,
      method: "GET"
    })
      .then(data => this.setState({ leaveRequest: data }))
      .catch(err => {
        // if unable to fetch data, assign default (spaces) to values
        let leaveRequest = [];
        this.setState({ leaveRequest: leaveRequest });
      });
  }
  componentDidMount() {
    this.loadHistoryData();
  }
  render() {
    const { leaveRequest } = this.state;

    if (!isManagerRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Leave History</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.leaveRequest.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.employeeDetails.name}</td>
                    <td>{item.leaveCategory.leaveDescr}</td>
                    <td>{item.leaveStatus}</td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.id.startDate}</Moment>
                    </td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.endDate}</Moment>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(StaffLeaveHistory);
