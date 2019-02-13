import React, { Component } from "react";
import { Table } from "reactstrap";
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';

class MyLeaveHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
    this.loadMyLeaveHistory = this.loadMyLeaveHistory.bind(this);
    this.autoIncrementRow = this.autoIncrementRow.bind(this);
  }

  loadMyLeaveHistory() {
    fetchData({
      url: API_BASE_URL + "/appliedleave/E000000001",
      method: 'GET'
    }).then(response => {
      this.setState({
        userData: response
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = [];
      this.setState({ userData: userData });
    });
  }

  componentDidMount() {
    this.loadMyLeaveHistory();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveHistory();
    }
  }

  autoIncrementRow() {
    let userData = [];
    console.log(userData);
    for (userData = 0; userData < userData.length; userData++) {
      userData += + userData;
    }
  }

  render() {
    return (
      <div className="mainContainerLeavePages">
        <div className="headerContainerFlex">
          <span>
            <h3 className="headerStyle">My Leave History</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td></td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.leaveDuration}</td>
                      <td>{item.leaveDescr}</td>
                      <td>{item.reason}</td>
                      <td>{item.effDate}</td>
                      <td>{item.leaveStatus}</td>
                      <td></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default MyLeaveHistory;
