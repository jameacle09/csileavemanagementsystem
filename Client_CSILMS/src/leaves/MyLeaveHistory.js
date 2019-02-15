import React, { Component } from "react";
import { Table } from "reactstrap";
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import Moment from 'react-moment';

class MyLeaveHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [
        // {
        //   joinDate: ""
        // }
      ]
    };
    this.loadMyLeaveHistory = this.loadMyLeaveHistory.bind(this);
  }

  loadMyLeaveHistory() {
    fetchData({
      url: API_BASE_URL + "/appliedleave/me",
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
      console.log(userData);
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

  
  render() {
    let userData = this.state.userData;
    // console.log(userData);
    // // reformat dates and retrive manager name ONLY when data fetch successfully
    // if (userData["id"] !== "") {
    //   let endDate = new Date(this.state.userData["endDate"]);
    //   userData["endDate"] =
    //   endDate.getFullYear() +
    //     "-" +
    //     (endDate.getMonth() + 1) +
    //     "-" +
    //     endDate.getDate();
    // }

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
                      <td><Moment format="YYYY-MM-DD">{item.id.startDate}</Moment></td>
                      <td><Moment format="YYYY-MM-DD">{item.endDate}</Moment></td>
                      <td>{item.leaveDuration}</td>
                      <td>{item.leaveCategory.leaveDescr}</td>
                      <td>{item.reason}</td>
                      <td><Moment format="YYYY-MM-DD">{item.id.effDate}</Moment></td>
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
