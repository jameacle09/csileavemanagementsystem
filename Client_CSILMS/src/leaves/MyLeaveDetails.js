import React, { Component } from "react";
import { Table } from "reactstrap";
import { fetchData } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import { withRouter } from 'react-router-dom';

class MyLeaveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
    this.loadMyLeaveDetails = this.loadMyLeaveDetails.bind(this);
    this.autoIncrementRow = this.autoIncrementRow.bind(this);

  }

  loadMyLeaveDetails() {
    fetchData({
      url: API_BASE_URL + "/leaveentitlement/me",
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
    this.loadMyLeaveDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadMyLeaveDetails();
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
            <h3 className="headerStyle">My Leave Details</h3>
          </span>
        </div>
        <br />
        <div className="tableContainerFlex">
          <Table responsive>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Entitlement</th>
                <th>Carry Forward</th>
                <th>Available</th>
                <th>Taken</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.userData.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.leaveCategory.leaveDescr}</td>
                      <td>{item.entitlement} days</td>
                      <td>{item.carryForward} days</td>
                      <td>{item.availableLeave} days</td>
                      <td>{item.takenLeave} days</td>
                      <td>{item.balanceLeave} days</td>
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

export default withRouter(MyLeaveDetails);
